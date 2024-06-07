export function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }

export function formatTableDate(date) {
  // console.log(date)
  // return;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear().toString();

  return `${year}-${month}-${day}`;
}

export function formatIndianNumber(number) {
 
  return number.toLocaleString('en-IN');
}
  

export const formatTitle = (inputValue) => {
    // Split the input value into an array of words
    const words = inputValue.toLowerCase().split(" ");
  
    // Capitalize the first letter of each word
    const formattedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the formatted words back into a single string
    const formattedTitle = formattedWords.join(" ");
  
    return formattedTitle;
  };
  
  export function formatDateCustom(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString();
  
    return `${day} - ${month} - ${year}`;
}