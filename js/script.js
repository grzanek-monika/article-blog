'use strict';

/* document.getElementById('test-button').addEventListener('click', function() {
    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);
}) */

const titleClickHandler = function(event){
    event.preventDefault();
    console.log('Link was clicked!');
    const clickedElement = this;
    console.log('event: ', event);
  
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      console.log('activeLinks', activeLinks);
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      console.log('activeArticle: ',  activeArticle);
      console.log('activeArticle(with plus) ',  + activeArticle);
    }

    /* get 'href' attribute from the clicked link */
      const articleSelector = clickedElement.getAttribute('href');
      console.log('articleSelector: ', articleSelector); // np. #article-5

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle: ', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('Function completed!');
  

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log('titleList: ', titleList)

    let html = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
    
    /* find the title element */
      const articleId = article.getAttribute('id');
      console.log('article: ', article);
      console.log('articleId: ', articleId);

    /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle', articleTitle);

    /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML: ', linkHTML);

    /* insert link into titleList */
      titleList.insertAdjacentHTML('afterbegin', linkHTML);  

    /* insert link into html variable */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    console.log('titleList: ', titleList.innerHTML);

    const links = document.querySelectorAll('.titles a');
  console.log('links: ', links)
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

{
generateTitleLinks();

}