$(function() {
  $.ajax({
    url: 'http://localhost:3000/api/v1/articles/2'
  }).then(function(article) {
    $('#2 .post-header-full .post-category').text(article.category.name)
    $('#2 .post-header-full .header-title h1').text(article.title)
    $('#2 .description').html(article.description)
    $('#2 .content').html(article.content)
    $('#2 .post-header-full').css('background-image', `url(${article.image})`)
  })

  const nearToBottom = 500
  const notTooNearBottom = 800
  let counter = 2
  let scrollCounter = 0

  async function loadNext() {
    scrollCounter ++
    if( scrollCounter % 40 == 0 ) {
      console.warn('you are scrolling while near the bottom')
      $.ajax({
        url: `http://localhost:3000/api/v1/articles/${counter += 1}`
      }).done(function(article) {
        if( article.title ) {
          $('body').append(`<div class="ajax-post post ajax" id="${counter}">
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

          </div>
          </div>
          </section>
          </div>
          </div>`)
          $(`#${counter} .post-header-full .post-category`).text(article.category.name)
          $(`#${counter} .post-header-full .header-title h1`).text(article.title)
          $(`#${counter} .description`).html(article.description)
          $(`#${counter} .content`).html(article.content)
          $(`#${counter} .post-header-full`).css('background-image', `url(${article.image})`)
        }
      })
    }
  }
  $(window).on('scroll', function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - notTooNearBottom && $(window).scrollTop() + $(window).height() < $(document).height() - nearToBottom) {
      loadNext()
    }
  })
})
