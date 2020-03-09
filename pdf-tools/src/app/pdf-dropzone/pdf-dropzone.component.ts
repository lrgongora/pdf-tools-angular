import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { DropzoneComponent , DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal  from 'sweetalert2';
import * as pdfjsLib from 'node_modules/pdfjs-dist/build/pdf.min.js'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-pdf-dropzone',
  templateUrl: './pdf-dropzone.component.html',
  styleUrls: ['./pdf-dropzone.component.css']
})
export class PdfDropzoneComponent implements OnInit {
  @Input() settings;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  @ViewChildren('canvas') elements: QueryList<any>;
  public pages: Number;

 files: File[] = [];

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }


    // init: function() {
    //     this.on('addedfile', function(file) {
    //         if (file.type !== "application/pdf") {
    //           Swal.fire({
    //             title: 'Only PDF files are accepted',
    //             icon: 'warning'
    //           });
    //             this.removeFile(file);
    //         }
    //         // } else {
    //         //     toggleLoader("show");
    //         //     $('#pdf-files-list li:last-of-type').data('file', file);
    //         //     if (fileOrderState === false) {
    //                 this.createCanvas(file).bind(this)
    //         //     }
    //         // }
    //     });
    //     this.on('queuecomplete', function() {
    //             this.removeAllFiles();
    //             // $('#pdf-pages-list').html("");

    //         }),
    //         this.on('processing', function() {
    //             // fileOrderState = false;
    //         })
    // }
    // }
    public onUploadSuccess(file, response){
        // toggleLoader("hide");

        // if (response.error) {
        //     popup.open("error", response.error);
        // } else {
        //     $('.download-filename').text(response.filename);
        //     $('.merge-download-link').attr('href', response.url);
        //     popup.open("download", null);
        //     resetDropzone();
    }

  submitFiles() {

  }

public onUploadInit(dropzone): void {
    console.log('onUploadInit:', dropzone);
            dropzone.on('addedfile', function(file) {
            if (file.type !== "application/pdf") {
              Swal.fire({
                title: 'Only PDF files are accepted',
                icon: 'warning'
              });
                this.removeFile(file);
            }
             else {
                this.toggleLoader("show");
                // $('#pdf-files-list li:last-of-type').data('file', file);
                // if (this.fileOrderState === false) {
                //     this.createCanvas(file).bind(this);
                // }
            }
        });
        dropzone.on('queuecomplete', function() {
                this.removeAllFiles();
                // $('#pdf-pages-list').html("");

            }),
        dropzone.on('processing', function() {
                // fileOrderState = false;
            })
  }

//    createCanvas(file) {
//     var fileReader = new FileReader();
//     fileReader.onload = function() {
//         var typedarray = new Uint8Array(fileReader.result);
//         typeof(typedarray);
//         var pdfDoc = pdfjsLib.getDocument(typedarray);
//         console.log(pdfDoc);
//         pdfDoc.promise.then(function(pdf) {
//             console.log(pdf);
//             this.pages = pdf.numPages;
//             // var pagesList = $('#pdf-pages-list');
//             var relationID = file.upload.uuid;
//             var canvasList = [];
//             pdf.getPage(1).then(function(page) {
//                 var fileCanvas = file.previewElement.getElementsByClassName('canvas')[0];
//                 var fileListElement = fileCanvas.parentElement;
//                 file.previewElement.setAttribute('data-relation', relationID);
//                 fileListElement.setAttribute('id', 'file' + this.pagePrefixes[this.prefixIndex].toString());
//                 this.renderPDF(fileCanvas, page);
//             });
//             for (let pageNum = 1; pageNum <= this.pages; pageNum++) {
//                 let pageNumber = `${(this.pagePrefixes[this.prefixIndex])+ pageNum}`;
//                 console.log(pageNum)
//                 console.log(pageNumber)
//                 var pageTemplate = `<li class="page-wrap" data-index="${pageNum}" data-relation="${relationID}"><div class="page-tools"><div class="button-group"><div class="button-delete delete-page"><i class="fas fa-trash-alt"></i></div></div></div><canvas class="canvas" id="page${pageNumber.toString()}"></canvas><div class="page-number">${pageNumber}</div></li>`;
//                 // pagesList.append(pageTemplate);
//                 canvasList.push(pageNumber);
//                 // $('.button-delete.delete-page').on('click', deletePage);

//             }
//             canvasList.forEach(function(canvasID, index) {
//                 let canvas = $(`#page${canvasID}`)[0];
//                 pdf.getPage(index + 1).then(function(page) {
//                     this.renderPDF(canvas, page)
//                 });
//             });
//             this.toggleLoader("hide");
//             this.prefixIndex++;

//         }, function(error) {
//             var mainDropzone = $('#main-dropzone')[0].dropzone;
//             mainDropzone.removeFile(file);
//             this.toggleLoader("hide");
//             // popup.open("error", "Invalid PDF file");
//         });



//     };
//     fileReader.readAsArrayBuffer(file);
// };

//  updatePageOrder() {
//     var pages = $('li.page-wrap');
//     this.pageOrder = [];
//     pages.each(function(index, page){
//         if(pages.length === 1){
//             this.pageOrder = [];
//         } else {
//         var dataIndex = page.getAttribute('data-index');
//         var dataRelation =  page.getAttribute('data-relation');
//         this.pageOrder.push(JSON.stringify({dataRelation,dataIndex}));
//         }
//     })
// }

 toggleLoader(state) {
    if (state === "show") {
        return true;

    } else if (state === "hide") {
        return false;

    }
}

//  deletePage() {
//     var relationID = $(this).parents('li.page-wrap').attr('data-relation');
//     var pages = $(`li.page-wrap[data-relation="${relationID}"]`);
//     var files = $('#main-dropzone')[0].dropzone.files;
//     var dropzone = $('#main-dropzone')[0].dropzone;
//     $(this).parents('li.page-wrap').remove();
//     if(pages.length === 0){
//         files.forEach(function(file){
//             if(file.upload.uuid === relationID){
//                 dropzone.removeFile(file);
//                 return;
//             }
//         })
//         $(`[data-relation=${relationID}]`).remove();
//     }
//     this.updatePageOrder();

// }

 deleteFile(dropzone) {
    // var relationID = $(this).parents('li.file-wrap').attr('data-relation');
    // $(`[data-relation=${relationID}]`).remove();
    console.log(dropzone)
}

//  submitMerge() {
//     var filesNumber = $('#main-dropzone')[0].dropzone.getQueuedFiles().length;
//     if (filesNumber <= 1) {
//         // popup.open("error", "PDF Merge utility requires two or more PDF files");
//     } else {
//         $('#main-dropzone')[0].dropzone.getQueuedFiles().length

//         this.fileOrderState = true;
//         $('li.file-wrap').addClass('invisible');
//         var mainDropzone = $('#main-dropzone')[0].dropzone;
//         var currentQueue = [];
//         $('#pdf-files-list > li').each(function() {
//             currentQueue.push($(this).data('file'));
//             this.fileOrder.push($(this).data('file').upload.uuid.toString());
//         });


//         mainDropzone.removeAllFiles();
//         $('li.page-wrap').remove();

//         for (let i = 0; i < currentQueue.length; i++) {
//             mainDropzone.addFile(currentQueue[i]);
//         }
//         console.log(currentQueue);
//         $('#pageOrder').val(this.pageOrder);
//         $('#fileOrder').val(this.fileOrder);
//         mainDropzone.processQueue();
//     }
// }

//  renderPDF(canvas, page) {
//     var originalSize = page.getViewport({}).viewBox;
//     let scale
//     console.log(originalSize)
//     if (originalSize[2] > 1200 || originalSize[3] > 1500) {
//         scale = 0.10;
//     } else {
//         scale = 0.25;
//     }
//     var viewport = page.getViewport({
//         scale: scale
//     });
//     var context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     var renderContext = {
//         canvasContext: context,
//         viewport: viewport
//     };
//     page.render(renderContext);
//     $('li.file-wrap').removeClass('invisible');

// }

 resetDropzone() {
    // var mainDropzone = $('#main-dropzone')[0].dropzone;
    // mainDropzone.removeAllFiles();
    // $('li.page-wrap').remove();
    // letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    // prefixIndex = 0;
    // pageOrder = [];
    // fileOrder = [];
    // fileOrderState = false;
}

//   constructor() {
//        var letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
//    var pagePrefixes = letters.split('');
//    var prefixIndex = 0;
//    var pageOrder: any[];
//    var fileOrder: any[];
//    var fileOrderState = false;
//   }

  ngOnInit(): void {
    // $("#pdf-pages-list").sortable({
    //     update: function(event, ui) {
    //         this.updatePageOrder();
    //     }
    // });
    // $("#pdf-pages-list").disableSelection();
    // $('#pdf-files-list').sortable();
    // $("#pdf-files-list").disableSelection();
    // $("#tabs").tabs();
  }

  ngAfterViewInit(){
   this.elements.changes.subscribe(canvas => {
      canvas.forEach(elm => this.myCallback(elm.nativeElement))
    })
  }

  myCallback(elm) {
    console.log(elm)
  }



}
