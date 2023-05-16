tinymce.init({
  selector: ".editor",
  plugins: "... your plugins ...",
  toolbar:
    "undo redo | customButton | keywordsButton | ingressButton ... your other toolbar items ...",
  setup: (editor) => {
    editor.ui.registry.addButton("customButton", {
      text: "make text better",
      onAction: async () => {
        const editorContent = editor.getContent();
        const encodedContent = encodeURIComponent(editorContent);
        console.log(editorContent);
        console.log(encodedContent);

        const loadingSpinner = document.getElementById("loading-spinner");
        const chatWindow = document.getElementById("chat-window");
        const chatContent = document.getElementById("chat-content");
        chatContent.innerHTML = ""; // clear the chat window content
        chatWindow.style.display = "block";
        loadingSpinner.style.display = "block";

        const response = await fetch("/api-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You are an AI assistant assigned to help me improve the quality of my sales text. I need three well-structured paragraphs to promote a product/service. Make also H2 elements and generate relevant headers to them. The text should be of high quality and convincing enough to make a sale. The output should be in HTML format. In your response, kindly assume that each paragraph is a return text. Please note that I just need the content at this moment, no other discussion is required from my side. Thank you.  ",
              },
              { role: "user", content: editorContent },
            ],
            max_tokens: 3000,
            temperature: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 0.95,
            stop: null,
          }),
        });

        const responseData = await response.json();
        const assistantMessage = responseData.choices[0].message.content;
        chatContent.innerHTML = assistantMessage;
        loadingSpinner.style.display = "none";
      },
    });
    editor.ui.registry.addButton("keywordsButton", {
      text: "keywords",
      onAction: async () => {
        const editorContent = editor.getContent();
        const encodedContent = encodeURIComponent(editorContent);
        console.log(editorContent);
        console.log(encodedContent);

        const loadingSpinner = document.getElementById("loading-spinner");
        const chatWindow = document.getElementById("chat-window");
        const chatContent = document.getElementById("chat-content");
        chatContent.innerHTML = ""; // clear the chat window content
        chatWindow.style.display = "block";
        loadingSpinner.style.display = "block";
        const azureapikey = "OPENAI_API_KEY";

        const response = await fetch("/api-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "As my AI assistant, I need your help to extract ten keywords from the following text. Please present the keywords separated by commas, without any numbers or additional annotation",
              },
              { role: "user", content: editorContent },
            ],
            max_tokens: 800,
            temperature: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 0.95,
            stop: null,
          }),
        });

        const responseData = await response.json();
        const assistantMessage = responseData.choices[0].message.content;
        chatContent.innerHTML = assistantMessage;
        loadingSpinner.style.display = "none";
      },
    });
    editor.ui.registry.addButton("ingressButton", {
      text: "ingress",
      onAction: async () => {
        const editorContent = editor.getContent();
        const encodedContent = encodeURIComponent(editorContent);
        console.log(editorContent);
        console.log(encodedContent);

        const loadingSpinner = document.getElementById("loading-spinner");
        const chatWindow = document.getElementById("chat-window");
        const chatContent = document.getElementById("chat-content");
        chatContent.innerHTML = ""; // clear the chat window content
        chatWindow.style.display = "block";
        loadingSpinner.style.display = "block";
        const azureapikey = "OPENAI_API_KEY";

        const response = await fetch("/api-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "As my AI assistant, I require your assistance to create a concise introduction, or ingress, for the following text. Please provide a single, tightly-written paragraph, not exceeding 100 characters including spaces.",
              },
              { role: "user", content: editorContent },
            ],
            max_tokens: 800,
            temperature: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 0.95,
            stop: null,
          }),
        });

        const responseData = await response.json();
        const assistantMessage = responseData.choices[0].message.content;
        chatContent.innerHTML = assistantMessage;
        loadingSpinner.style.display = "none";
      },
    });
  },
});
document.getElementById("replace-ingress").addEventListener("click", () => {
  var ingressField = document.getElementById("ingress");
  const chatContent = document.getElementById("chat-content");
  ingressField.value = chatContent.innerHTML;
});
document.getElementById("replace-keywords").addEventListener("click", () => {
  var keywordsField = document.getElementById("keywords");
  const chatContent = document.getElementById("chat-content");
  keywordsField.value = chatContent.innerHTML;
});
document.getElementById("replace-original").addEventListener("click", () => {
  const chatContent = document.getElementById("chat-content");
  tinymce.activeEditor.setContent(chatContent.innerHTML);
});
document.getElementById("close-chat").addEventListener("click", () => {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.style.display = "none";
});
