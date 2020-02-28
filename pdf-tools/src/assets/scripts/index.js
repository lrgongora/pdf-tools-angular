var letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
var pagePrefixes = letters.split('');
var prefixIndex = 0;
var pageOrder;
var fileOrder = [];
var fileOrderState = false;

$(function() {
    $("#pdf-pages-list").sortable({
        update: function(event, ui) {
            updatePageOrder();
        }
    });
    $("#pdf-pages-list").disableSelection();
    $('#pdf-files-list').sortable();
    $("#pdf-files-list").disableSelection();
    $("#tabs").tabs();
    $('#merge-button').on('click', submitMerge);
    $('#reset-button').on('click', resetDropzone)
    $('.dropzone').on('dragover', function(e) {
        $('#drop-message-zone').css('display', 'block');
    })
    $('.dropzone').on('dragleave drop', function(e) {
        $('#drop-message-zone').css('display', 'none');
    })
    $(document).tooltip();
});

var popup = {
    errorPopup: null,
    downloadPopup: null,
    open: function(type, content) {
        switch (type) {
            case "error":
                $("#error-message").text(content);
                popup.errorPopup = new Custombox.modal({
                    content: {
                        effect: 'fadein',
                        target: '#error-modal',
                        onClose: function() {
                            $('#error-message').html("");
                        }
                    },
                    loader: {
                        active: false
                    }
                });
                popup.errorPopup.open();
                return false;
            case "download":
                popup.downloadPopup = new Custombox.modal({
                    content: {
                        effect: 'fadein',
                        target: '#download-modal',
                        onClose: function() {
                            $('.merge-download-link').attr('href', "");
                        }
                    },
                    loader: {
                        active: false
                    }
                });
                popup.downloadPopup.open();
                return false;
        }

    }
}


Dropzone.options.mainDropzone = { //BAD IMPLEMENTATION FOR MULTIPLE DROPZONES. REFACTOR LATER.
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 10,
    paramName: function() {
        return "files"
    },
    previewsContainer: ".dropzone-previews",
    dictDefaultMessage: 'Drop a PDF here to upload, or click to select one',
    previewTemplate: '<li class="file-wrap invisible"> <div class="file-tools"> <div class="button-group"> <div class="button-delete delete-file"> <i class="fas fa-trash-alt" data-dz-remove></i> </div> </div> </div> <canvas class="canvas"></canvas> <div class="filename" data-dz-name></div> <div class="filesize" data-dz-size></div> </li>',
    maxFiles: 10,
    acceptedFiles: 'application/pdf',
    init: function() {
        this.on('addedfile', function(file) {
            if (file.type !== "application/pdf") {
                popup.open("error", "Only PDF files are accepted");
                this.removeFile(file);
            } else {
                toggleLoader("show");
                $('#pdf-files-list li:last-of-type').data('file', file);
                if (fileOrderState === false) {
                    createCanvas(file);
                }
            }
        });
        this.on('queuecomplete', function() {
                this.removeAllFiles();
                $('#pdf-pages-list').html("");

            }),
            this.on('processing', function() {
                fileOrderState = false;
            })
    },
    success: function(file, response) {
        toggleLoader("hide");

        if (response.error) {
            popup.open("error", response.error);
        } else {
            $('.download-filename').text(response.filename);
            $('.merge-download-link').attr('href', response.url);
            popup.open("download", null);
            resetDropzone();

        }
    }
}


function createCanvas(file) {
    var fileReader = new FileReader();
    fileReader.onload = function() {
        var typedarray = new Uint8Array(this.result);
        typeof(typedarray);
        var pdfDoc = pdfjsLib.getDocument(typedarray);
        console.log(pdfDoc);
        pdfDoc.promise.then(function(pdf) {
            console.log(pdf);
            var pages = pdf.numPages;
            var pagesList = $('#pdf-pages-list');
            var relationID = file.upload.uuid;
            var canvasList = [];
            pdf.getPage(1).then(function(page) {
                var fileCanvas = file.previewElement.getElementsByClassName('canvas')[0];
                var fileListElement = fileCanvas.parentElement;
                file.previewElement.setAttribute('data-relation', relationID);
                fileListElement.setAttribute('id', 'file' + pagePrefixes[prefixIndex].toString());
                $('.button-delete.delete-file i').on('click', deleteFile);
                renderPDF(fileCanvas, page);
            });
            for (var pageNum = 1; pageNum <= pages; pageNum++) {
                var pageNumber = `${(pagePrefixes[prefixIndex])+ pageNum}`;
                console.log(pageNum)
                console.log(pageNumber)
                var pageTemplate = `<li class="page-wrap" data-index="${pageNum}" data-relation="${relationID}"><div class="page-tools"><div class="button-group"><div class="button-delete delete-page"><i class="fas fa-trash-alt"></i></div></div></div><canvas class="canvas" id="page${pageNumber.toString()}"></canvas><div class="page-number">${pageNumber}</div></li>`;
                pagesList.append(pageTemplate);
                canvasList.push(pageNumber);
                $('.button-delete.delete-page').on('click', deletePage);

            }
            canvasList.forEach(function(canvasID, index) {
                var canvas = $(`#page${canvasID}`)[0];
                pdf.getPage(index + 1).then(function(page) {
                    renderPDF(canvas, page)
                });
            });
            toggleLoader("hide");
            prefixIndex++;

        }, function(error) {
            var mainDropzone = $('#main-dropzone')[0].dropzone;
            mainDropzone.removeFile(file);
            toggleLoader("hide");
            popup.open("error", "Invalid PDF file");
        });



    };
    fileReader.readAsArrayBuffer(file);
};

function updatePageOrder() {
    var pages = $('li.page-wrap');
    pageOrder = [];
    pages.each(function(index, page){
        if(pages.length === 1){
            pageOrder = [];
        } else {
        var dataIndex = page.getAttribute('data-index');
        var dataRelation =  page.getAttribute('data-relation');
        pageOrder.push(JSON.stringify({dataRelation,dataIndex}));
        }
    })
}

function toggleLoader(state) {
    if (state === "show") {
        $('.loader').removeClass('hidden');

    } else if (state === "hide") {
        $('.loader').addClass('hidden');

    }
}

function deletePage() {
    var relationID = $(this).parents('li.page-wrap').attr('data-relation');
    var pages = $(`li.page-wrap[data-relation="${relationID}"]`);
    var files = $('#main-dropzone')[0].dropzone.files;
    var dropzone = $('#main-dropzone')[0].dropzone;
    $(this).parents('li.page-wrap').remove();
    if(pages.length === 0){
        files.forEach(function(file){
            if(file.upload.uuid === relationID){
                dropzone.removeFile(file);
                return;
            }
        })
        $(`[data-relation=${relationID}]`).remove();
    }
    updatePageOrder();

}

function deleteFile() {
    var relationID = $(this).parents('li.file-wrap').attr('data-relation');
    $(`[data-relation=${relationID}]`).remove();
}

function submitMerge() {
    var filesNumber = $('#main-dropzone')[0].dropzone.getQueuedFiles().length;
    if (filesNumber <= 1) {
        popup.open("error", "PDF Merge utility requires two or more PDF files");
    } else {
        $('#main-dropzone')[0].dropzone.getQueuedFiles().length

        fileOrderState = true;
        $('li.file-wrap').addClass('invisible');
        var mainDropzone = $('#main-dropzone')[0].dropzone;
        var currentQueue = [];
        $('#pdf-files-list > li').each(function() {
            currentQueue.push($(this).data('file'));
            fileOrder.push($(this).data('file').upload.uuid.toString());
        });


        mainDropzone.removeAllFiles();
        $('li.page-wrap').remove();

        for (i = 0; i < currentQueue.length; i++) {
            mainDropzone.addFile(currentQueue[i]);
        }
        console.log(currentQueue);
        $('#pageOrder').val(pageOrder);
        $('#fileOrder').val(fileOrder);
        mainDropzone.processQueue();
    }
}

function renderPDF(canvas, page) {
    var originalSize = page.getViewport({}).viewBox;
    console.log(originalSize)
    if (originalSize[2] > 1200 || originalSize[3] > 1500) {
        scale = 0.10;
    } else {
        scale = 0.25;
    }
    var viewport = page.getViewport({
        scale: scale
    });
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    page.render(renderContext);
    $('li.file-wrap').removeClass('invisible');

}

function resetDropzone() {
    var mainDropzone = $('#main-dropzone')[0].dropzone;
    mainDropzone.removeAllFiles();
    $('li.page-wrap').remove();
    letter = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    prefixIndex = 0;
    pageOrder = [];
    fileOrder = [];
    fileOrderState = false;
}