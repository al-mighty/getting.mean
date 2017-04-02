// var recordText = function(){
//     var temp = document.getElementById('nameBook').value;
//     localStorage.setItem('infoBook', temp); //Добавление строки в LocalStorage к ключу infoBook
//     console.log("Загружено!");
// };

$( document ).ready(function() {

    function readImage(fileInput) { //Загрузка изображения
        if ( fileInput.files && fileInput.files[0] ) {
            var FR= new FileReader();
            FR.onload = function(e) {
                console.info("Загружено!");
                localStorage.setItem('infoBook', e.target.result);  //Добавление кода base64 в LocalStorage к ключу infoBook
            };
            FR.readAsDataURL( fileInput.files[0] );
        }
    }
    function validateSize(fileInput) { //Проверка добавленного файла на размер (Лимит LocalStorage 5Мб)
        var fileObj, size;
        if ( typeof ActiveXObject == "function" ) { // IE
            fileObj = (new ActiveXObject("Scripting.FileSystemObject")).getFile(fileInput.value);
        }else {
            fileObj = fileInput.files[0];
        }

        size = fileObj.size; //Размер в байтах
        if(size > 5 * 1024 * 1024){ //5Mb
            console.error('Слишком большой размер файла (максимум 5 Mб)');
            //Очищаем поле ввода файла
            fileInput.parentNode.innerHTML = fileInput.parentNode.innerHTML;
        }
    }

    $("#imgBook").change(function () {
        validateSize(this);
    });

    $("#loadBook").click(function () {
        console.log("ПРоисходит чтение");
        readImage($("#imgBook")[0]);
    });

    $urlImgBook=localStorage.getItem('infoBook');
    $('#bookImg').attr('src',$urlImgBook)
});