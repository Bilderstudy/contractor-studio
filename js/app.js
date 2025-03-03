/*URL обработки формы обратной связи (пример)*/
var URL_FORM = "http://localhost:8080/write";
/*URL обработки формы звонка (пример)*/
var URL_CALL_ME = "http://localhost:8080/call";

$(document).ready(function () {

  /*Обработка submit формы обратной связи*/
  $("#contactForm").submit(function(event) {
    event.preventDefault();

    /*конвертация данных формы в объект для отправки*/
    var formData = serializeForm(this);

    /*отправка данных на сервер*/
    $.ajax({
      url: URL_FORM,
      type: "POST",
      data: formData,
      dataType: "json",
      success: function() {
          //сервер ответил что всё ок, вывожу в форму alert success
          $("#contactForm-info").append("<div class='alert alert-success alert-dismissible' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span></button>" +
          "Сообщение отправлено" +
          "</div>");

      },
      error: function () {
          //ошибка запроса, вывожу в форму alert error
          $("#contactForm-info").append("<div class='alert alert-danger alert-dismissible' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span></button>" +
          "Ошибка отправки сообщения" +
          "</div>");
      }
    });
  });

/*Обработка submit формы звонка*/
  $("#callMe-Form").submit(function(event) {
    event.preventDefault();
    /*конвертация данных формы в объект для отправки*/
    var formData = serializeForm(this);

    /*отправка данных на сервер*/
    $.ajax({
      url: URL_CALL_ME,
      type: "POST",
      data: formData,
      dataType: "json",
      success: function() {
          //сервер ответил что всё ок, закрываю модалку
          $("#modalCall").modal("toggle");

      },
      error: function () {
          //ошибка запроса, вывожу в форму alert error
          $("#callMe-info").append("<div class='alert alert-danger alert-dismissible' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span></button>" +
          "Ошибка" +
          "</div>");          
      }
    });
  });
});


/*Метод сериализации формы и конвертации данных а объект для отправки.
вполне подойдет для не сложных форм*/
function serializeForm(element) {
  var formData = {};
  $(element).serializeArray().forEach(function(item) {
    formData[item.name] = item.value;
  });
  return formData;
}
