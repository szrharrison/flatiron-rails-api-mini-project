$(function() {
  $.ajax({
    url: `http://localhost:3000/api/v1/articles/rand`
  }).then(function(article) {
    $('.post-header-full .post-category').text(article.category.name)
    $('.post-header-full .header-title h1').text(article.title)
    $('.description').html(article.description)
    $('.content').html(article.content)
    $('.post-header-full').css('background-image', `url(${article.image})`)
    article.tags.forEach(function(tag) {
      $('#sidebar .tags').append(`<a href="/tags/${tag.name}">#${tag.name}</a>`)
    })
  })

  $(window).on('scroll.ajax', scrollHandler)

})


//Declare a event hanlder
function scrollHandler(){
  if ($('.loading').hasClass('inactive')) {
    if ( nearToBottom(500) ) {
      $('.loading').removeClass('inactive')
      $('.loading').addClass('active')
      doActionAndStopScript()


      //Bind event
      $(window).on('scroll.ajax', scrollHandler);
    }
  }
}
let counter = 1

function doActionAndStopScript(){
  // now it will fire once
  loadNext()
  //Unbind it
  $(window).off('scroll.ajax');
}



function loadNext() {
    $.ajax({
      url: `http://localhost:3000/api/v1/articles/${counter += 1}`
    }).then(function(article) {

      appendNextArticle( counter )

      $(`#${counter} .post-header-full .post-category`).text(article.category.name)
      $(`#${counter} .post-header-full .header-title h1`).text(article.title)
      $(`#${counter} .description`).html(article.description)
      $(`#${counter} .content`).html(article.content)
      $(`#${counter} .post-header-full`).css('background-image', `url(${article.image})`)
      article.tags.forEach(function(tag) {
        $(`#${counter} #sidebar .tags`).append(`<a href="/tags/${tag.name}">#${tag.name}</a>`)
      })

      $('.loading').addClass('inactive')
      $('.loading').removeClass('active')
    })
  }

function appendNextArticle(counter) {
  $(`body`).append(`<div class="ajax-post post ajax" id="${counter}">
  <div class="post-header-full">
  <div>
  <div class="container-fluid relative">
  <section class="section header-title">
  <a class="post-category"></a>
  <h1></h1>
  </section>
  </div>
  </div>
  </div>
  <div class="container-fluid content-container">
  <section class="section blog-content">
  <div class="table">
  <div class="col-left">
  <div class="post-content module">
  <div class="description">
  </div>
  <div class="content">
  </div>
  </div>
  </div>
    <div id="sidebar" class="hidden-sm hidden-xs">
      <div class="module tags"></div>
    </div>
  </div>
  </section>
  </div>
  </div>`)
}

function nearToBottom(distance) {
  return $(window).scrollTop() + $(window).height() > $(document).height() - distance
}
