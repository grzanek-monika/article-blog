/* eslint-disable no-unused-vars */
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
};
  
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsSelector = 'a[href^="#tag-"]',
  optActiveTagsSelector = 'a.active[href^="#tag-"]',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList: ', titleList);

  let html = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('customSelector: ', customSelector); // np. [data-tags~="tutorials"]
  console.log('optArticleSelector + customSelector: ', optArticleSelector + customSelector); // .post[data-tags~="tutorials"]
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
  console.log('links: ', links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

{
  generateTitleLinks();

}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const wrapperOfTags = article.querySelector(optArticleTagsSelector);
    console.log('wrapperOfTags: ', wrapperOfTags);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const dataTagsAttribute = article.getAttribute('data-tags');
    console.log('dataTagsAttribute: ', dataTagsAttribute);

    /* split tags into array */
    const arrayWithTags = dataTagsAttribute.split(' ');
    console.log('arrayWithTags: ', arrayWithTags);
    /* START LOOP: for each tag */
    for(let tag of arrayWithTags) {

      /* generate HTML of the link */
      const tagLink = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      console.log('articleTag: ', tagLink);
      /* add generated code to html variable */
      html = html + tagLink;
      console.log('html: ', html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapperOfTags.insertAdjacentHTML('afterbegin', html);
    console.log('wrapperOfTags: ', wrapperOfTags);
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag: ', tag);
  /* find all tag links with class active */
  const allActiveTags = document.querySelectorAll(optActiveTagsSelector);
  console.log('allActiveTags: ', allActiveTags);
  /* START LOOP: for each active tag link */
  for(let activeLink of allActiveTags) {
  /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksWithHref  = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let link of linksWithHref) {
  /* add class active */
    link.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksOfTags = document.querySelectorAll(optTagsSelector);
  console.log('linksOfTags: ', linksOfTags);
  /* START LOOP: for each link */
  for(let link of linksOfTags) {
  /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const wrapperOfAuthor = article.querySelector(optArticleAuthorSelector);
    console.log('wrapperOfAuthor: ', wrapperOfAuthor);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const dataAuthorAttribute = article.getAttribute('data-author');
    console.log('dataAuthorAttribute: ', dataAuthorAttribute);
    /* generate HTML of the link */
    const authorLink = `by <a href=${dataAuthorAttribute}`;
    console.log('articleTag: ', tagLink);
    /* add generated code to html variable */
    html = html + tagLink;
    console.log('html: ', html);
    /* END LOOP: for each tag */
  
    /* insert HTML of all the links into the tags wrapper */
    wrapperOfTags.insertAdjacentHTML('afterbegin', html);
    console.log('wrapperOfTags: ', wrapperOfTags);
  /* END LOOP: for every article: */
  }
}
