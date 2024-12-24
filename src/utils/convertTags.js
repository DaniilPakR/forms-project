export const convertTags = (str) => {
  const splitArray = str.split(" ");

  const tagsArray = splitArray.map(tag => tag.replace("#", ""));

  return tagsArray;
};

export const convertTagsBack = (arr) => {
  const hashtagArray = arr.map(item => `#${item.tag_text}`);
  
  return hashtagArray.join(" ");
}