document.body.classList.remove('no-js');

    //Создание переменных

    //Элементы меню
const menuListElement = document.querySelector('.js-menu-list');
const btnBurgerElement = document.querySelector('.js-header-burger');


    //Элементы формы поиска
const formSearchElement = document.querySelector('.js-header-search');
const inputFormSearchElement = document.querySelector('.js-search'); 
const btnSearchSubmitElement = document.querySelector('.js-search-submit');


    //Элементы header-info
const headerDateTimeElement = document.querySelector('.js-header-datetime');
const headerInfoDateElement = document.querySelector('.js-header-date');
const headerInfoDayElement = document.querySelector('.js-header-day');  
const headerInfoTimeElement = document.querySelector('.js-header-time');


    //Дата и время
const date = new Date();
const dateTime = date.toLocaleString('ru', {hour:'numeric', minute:'numeric', day:'numeric', month:'numeric', year:'numeric'}).split(', ').reverse().join('  ');
const dateNow = date.toLocaleString('ru', {month:'long', day:'numeric',weekday: 'short' }).split(', ').reverse().join(', ');  
const timeNow = date.toLocaleString('ru', {hour:'numeric', minute:'numeric' });
const valAttrDatetime = date.toLocaleString('ru', {month:'numeric', day:'numeric', year:'numeric'}).split('.').reverse().join('-') + 'T' + timeNow; 


    //Отображение актуальной даты и времени в header и атрибуте datetime
headerDateTimeElement.setAttribute('datetime', valAttrDatetime)
headerInfoDateElement.setAttribute('datetime', valAttrDatetime)

headerDateTimeElement.innerHTML = dateTime;
headerInfoDayElement.innerHTML = dateNow;
headerInfoTimeElement.innerHTML = timeNow;


//Навешиваем событие на кнопку разворачивая меню    
  btnBurgerElement.addEventListener('click', onBtnShowMenuElemClick);

//Навешиваем событие при загрузке страницы и изменении ширины окна
  window.addEventListener('load', checkViewPortUser);
  window.addEventListener('resize', checkViewPortUser);


//Функция проверки viewport
function checkViewPortUser() {  
  const clientWidth = document.documentElement.clientWidth;   

  if (clientWidth < 931) {
    //Меняем значение aria-label на кнопке поиска
    btnSearchSubmitElement.setAttribute('aria-label', 'Заполнить форму для поиска');

    //Навешиваем по клику функцию показа/скрытия формы поиска
    btnSearchSubmitElement.addEventListener('click', onSearchBtnClick);
  }
  else {
    //Навешиваем событие на body в десктопной версии
      document.body.addEventListener('click', onBodyClickResetFormSearch);
  }
}
 

 //Функция показа/скрытия формы поиска
  function onSearchBtnClick(event) {
    event.preventDefault();     
    const target = event.target;
    const valAttrExpanded = target.getAttribute('aria-expanded');

    if (valAttrExpanded == 'true') {
      target.setAttribute('aria-label', 'Заполнить форму для поиска');
      target.setAttribute ('aria-expanded', 'false');
      inputFormSearchElement.classList.remove('search-mobile');

      //Навешиваем по клику функцию показа/скрытия формы поиска
      btnSearchSubmitElement.addEventListener('click', onSearchBtnClick);
      
      //Удаляем событие по клику на body
      document.body.removeEventListener('click', onBodyClickForCancelSearch);
    }

    else {
      //Устанавливаем фокус
      inputFormSearchElement.focus();

      //Навешиваем по клику функцию показа/скрытия формы поиска
      btnSearchSubmitElement.addEventListener('click', onSearchBtnClick);
      
      target.setAttribute('aria-label', 'Найти');
      target.setAttribute ('aria-expanded', 'true');
      inputFormSearchElement.classList.add('search-mobile');

      //Навешиваем событие на body
        document.body.addEventListener('click', onBodyClickForCancelSearch);

      //Удаляем обработчик события открытия формы поиска
      btnSearchSubmitElement.removeEventListener('click', onSearchBtnClick);      
    }    
  }


  //Функция показа/скрытия меню
  function onBtnShowMenuElemClick() {
    const target = event.target;
    const valAttrExpanded = target.getAttribute('aria-expanded');
    menuListElement.closest('.js-header').classList.toggle('menu-open');    

    if (valAttrExpanded == 'true') {
      target.setAttribute('aria-label', 'Показать меню');
      target.setAttribute ('aria-expanded', 'false');      
    }

    if (valAttrExpanded == 'false') {            
      target.setAttribute('aria-label', 'Скрыть меню');
      target.setAttribute ('aria-expanded', 'true');      
    }
  }
    
 //Функция сворачивания формы при клике вне ее в мобильной версии
  function onBodyClickForCancelSearch() {    
    const target = event.target;    
     if(!inputFormSearchElement.contains(target) && !btnSearchSubmitElement.contains(target)) {     
      inputFormSearchElement.classList.remove('search-mobile');
      formSearchElement.reset();

      btnSearchSubmitElement.setAttribute('aria-label', 'Заполнить форму для поиска');
      btnSearchSubmitElement.setAttribute ('aria-expanded', 'false');
      
      //Удаляем событие по клику на body
      document.body.removeEventListener('click', onBodyClickForCancelSearch);

      //Снова навешиваем по клику функцию показа/скрытия формы поиска
      btnSearchSubmitElement.addEventListener('click', onSearchBtnClick);    
    }    
  }

//Функция сброса формы при клике вне ее в десктопной версии
  function onBodyClickResetFormSearch() {
    if(!inputFormSearchElement.contains(event.target) && !btnSearchSubmitElement.contains(event.target)) {
      formSearchElement.reset();
    }
  }


   



