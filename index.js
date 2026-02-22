const mytextarea = document.getElementsByTagName("textarea")[0];
const footerText = document.querySelector(".footer-text");
var date = new Date();
var year = date.getFullYear();

function submitWord() {
  const textareaValue = mytextarea.value
  function wordCount(str) {
    if (textareaValue == "") {
      return str.split(" ").length - 1;
    } else {
      return str.split(" ").length;
    }
  }

  const result = (document.getElementsByTagName(
    "h3"
  )[0].innerHTML = `You have ${wordCount(textareaValue)} ${
    wordCount(textareaValue) == 1 ? "word" : "words"
  } in your text 🎖`);
}

//footer copyright text
footerText.innerHTML = `copyright &copy; Aahil ${year}`;
