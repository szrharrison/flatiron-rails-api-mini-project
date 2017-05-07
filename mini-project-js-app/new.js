$(function() {

  let categorizing = $.ajax({
    url: 'http://localhost:3000/api/v1/categories'
  }).then(function(cats) {
    const categories = setCategories(cats)
    return categories()
  })

  categorizing.then(function(categories) {
    const options = buildCategoryInput(categories)
    $('#category-select').html(options)
  })

  $('textarea#froala-editor').froalaEditor()
  .on('froalaEditor.contentChanged', function (e, editor) {
    $('#froala-preview').html(editor.html.get())
  })

  $('div#editable-description').froalaEditor({
    toolbarInline: true,
    initOnClick: true,
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertLink', 'undo', 'redo']
  })

  $('h1#editable-title').froalaEditor({
    toolbarInline: true,
    initOnClick: true,
    charCounterCount: false,
    toolbarButtons: ['undo', 'redo']
  })

  $('#category-select').focusout(function() {
    let cat = $("#category-select option:selected").text()
    $('section.header-title .post-category').text( cat )
  })

  $('#image-link').focusout(function() {
    $('.post-header-full').css( 'background-image', `url(${getImage()}` )
  })

  $('#tags').focusout(function() {
    $('#sidebar .module.tags').html( getTags().map((tag) => {
      return `<a href="#">#${tag.name}</a>`
    }).join('') )
  })

  $('#save').on('click', function() {
    let data = getArticleData()
    createArticle( data )
  })
})

function setCategories (categories) {
  const cats = categories
  return function() {
    return cats
  }
}

function getImage() {
  return $('#image-link').val()
}
function getTags() {
  return $('#tags').val().split(',').map((tag,index,tags) => {
    return { name: tag.replace(/(^\s*)|(\s*$)/g, '') }
  })
}

function getArticleData() {
  let content = $('#froala-preview').html()
  let description = $('#editable-description .fr-element').html()
  let title = $('#editable-title .fr-element').text()
  let category = $('#category-select').val()
  let image = getImage()
  let tags = getTags()
  let data = {
    article: {
      content: content,
      description: description,
      title: title,
      category_id: category,
      image: image,
      tags: tags
    }
  }
  return data

}

function createArticle(data) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/articles',
    method: 'POST',
    data: data
  })
}

function buildCategoryInput(categories) {
  const selectOptions = categories.map((category) => {
    return `<option value="${category.id}">${category.name}</option>`
  })

  return selectOptions.join('')
}






  // category_id: "8"
  // content: "<h2>Humans:</h2><p>Normally they don't have sparkles...</p><p><img class="fr-dib fr-fil" src="https://i.froala.com/download/0e0772c79d7d9068b737996a0ecb33895e962f78.?1494101537" style="width: 300px;"></p><h2>Enhancements:</h2><p>These make things better...<img src="https://i.froala.com/download/42fb6b29aeeba516231cd590004116789767674a.jpg?1494102814" style="width: 300px;" class="fr-fil fr-dib"></p><h2>Enhanced Humans:</h2><p>Now humans can have sparkles!!!<img src="https://i.froala.com/download/62e0fda4b355a402d77362675af9a739d5b841ad.jpg?1494102857" style="width: 300px;" class="fr-fir fr-dib"></p>"
  // description: "<p>This is the description of a test article which happens to be about enhancing humans with sparkles. Not Pirate Ipsum!</p>"
  // image: "http://59e277b08a312b143833-2b432473b9c341dcf45e3ee5de802202.r66.cf2.rackcdn.com/uploaded/t/0e5370395_1471893719_the-party-header.jpg"
  // tags: 0: "#sparkles"1: "#humans"2: "#enhancement"
  // title: "This is a test article about enhancing humans with sparkles!"
