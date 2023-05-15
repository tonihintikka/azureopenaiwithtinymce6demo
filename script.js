tinymce.init({
    selector: '.editor',
    plugins: '... your plugins ...',
    toolbar: 'undo redo | customButton | keywordsButton | ingressButton ... your other toolbar items ...',
    setup: (editor) => {
      editor.ui.registry.addButton('customButton', {
        text: 'make text better',
        onAction: async () => {
          const editorContent = editor.getContent();
          const encodedContent = encodeURIComponent(editorContent);
          console.log(editorContent);
          console.log(encodedContent);

          const loadingSpinner = document.getElementById('loading-spinner');
          const chatWindow = document.getElementById('chat-window');
          const chatContent = document.getElementById('chat-content');
          chatContent.innerHTML = ''; // clear the chat window content
          chatWindow.style.display = 'block';
          loadingSpinner.style.display = 'block';
          

          const response = await fetch('/api-call', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  messages: [
    { role: "system", content: "You are an AI assistant that helps me to make this text better. Give me 3 paragraphs quality selling text if you need please image the paragraphs return text as html. Just content no other discussion for my side.  " },
    { role: "user", content: editorContent }
  ],
  max_tokens: 3000,
  temperature: 0.7,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 0.95,
  stop: null
})
});



          const responseData = await response.json();
          const assistantMessage = responseData.choices[0].message.content;
          chatContent.innerHTML = assistantMessage;
          loadingSpinner.style.display = 'none';
        }
      });
      editor.ui.registry.addButton('keywordsButton', {
        text: 'keywords',
        onAction: async () => {
          const editorContent = editor.getContent();
          const encodedContent = encodeURIComponent(editorContent);
          console.log(editorContent);
          console.log(encodedContent);

          const loadingSpinner = document.getElementById('loading-spinner');
          const chatWindow = document.getElementById('chat-window');
          const chatContent = document.getElementById('chat-content');
          chatContent.innerHTML = ''; // clear the chat window content
          chatWindow.style.display = 'block';
          loadingSpinner.style.display = 'block';
          const azureapikey="OPENAI_API_KEY"

          const response = await fetch('/api-call', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  messages: [
    { role: "system", content: "You are an AI assistant that helps me to get 10 keywords from this text. give them just comma separated without numbers" },
    { role: "user", content: editorContent }
  ],
  max_tokens: 800,
  temperature: 0.7,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 0.95,
  stop: null
})
});



          const responseData = await response.json();
          const assistantMessage = responseData.choices[0].message.content;
          chatContent.innerHTML = assistantMessage;
          loadingSpinner.style.display = 'none';
        }
      });
      editor.ui.registry.addButton('ingressButton', {
        text: 'ingress',
        onAction: async () => {
          const editorContent = editor.getContent();
          const encodedContent = encodeURIComponent(editorContent);
          console.log(editorContent);
          console.log(encodedContent);

          const loadingSpinner = document.getElementById('loading-spinner');
          const chatWindow = document.getElementById('chat-window');
          const chatContent = document.getElementById('chat-content');
          chatContent.innerHTML = ''; // clear the chat window content
          chatWindow.style.display = 'block';
          loadingSpinner.style.display = 'block';
          const azureapikey="OPENAI_API_KEY"

          const response = await fetch('/api-call', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  messages: [
    { role: "system", content: "You are an AI assistant that helps me to get ingress of this text just one tight paragraps max 100 characters withs spaces" },
    { role: "user", content: editorContent }
  ],
  max_tokens: 800,
  temperature: 0.7,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 0.95,
  stop: null
})
});



          const responseData = await response.json();
          const assistantMessage = responseData.choices[0].message.content;
          chatContent.innerHTML = assistantMessage;
          loadingSpinner.style.display = 'none';
        }
      });



    }
  });
  document.getElementById('replace-ingress').addEventListener('click', () => {
    var ingressField = document.getElementById('ingress');
    const chatContent = document.getElementById('chat-content');
    ingressField.value = (chatContent.innerHTML);
    
  });
  document.getElementById('replace-keywords').addEventListener('click', () => {
    var keywordsField = document.getElementById('keywords');
    const chatContent = document.getElementById('chat-content');
    keywordsField.value = (chatContent.innerHTML);
    
  });
  document.getElementById('replace-original').addEventListener('click', () => {
    const chatContent = document.getElementById('chat-content');
    tinymce.activeEditor.setContent(chatContent.innerHTML);
    
  });
  document.getElementById('close-chat').addEventListener('click', () => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = 'none';

  });