
export const getPostBookTranslation = () => {
  return fetch(`https://bible.helloao.org/api/BSB/books.json`).then(res => res.json())
}

export const getPostChapter = (book, chapter) => {
  return fetch(`https://bible.helloao.org/api/BSB/${book}/${chapter}.json`).then(res => res.json())
}