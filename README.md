# TinyMCE 6 and Azure OpenAI Demo

This repository contains a simple demo showcasing the integration of TinyMCE 6 editor with Azure OpenAI API for text improvement, keyword extraction, and generating ingress.

https://github.com/tonihintikka/azureopenaiwithtinymce6demo/assets/6028261/97867f66-3d5a-4a1f-86b2-9afcf6124aec

## Prerequisites

1. Obtain a TinyMCE editor API key by signing up at [Tiny.cloud](https://www.tiny.cloud/my-account/dashboard/#).
2. Create an Azure OpenAI instance using ChatGPT 3.5 Turbo.

## Setup and Installation

1. Clone this repository.
2. Create a copy of the provided example `.env` file and replace the values with your own API keys.
3. Run the following commands:

```bash
npm install
npm start
```

## added the weather API demo

https://github.com/tonihintikka/azureopenaiwithtinymce6demo/assets/6028261/1b507549-45d0-469b-94f0-82ec76a40a26

A demo combining the Weather API and Azure API has been added to weatherform.html. You can access it by opening the following address: http://localhost3000/weatherform.

This form prompts you to select your preferred sport and provides clothing recommendations based on the current weather conditions.

If you plan to make any style changes, please note that I am using Tailwind CSS. To ensure your styles are updated while coding, remember to run the following command:

```bash
npx tailwindcss -i weather.css -o weatherstyles.css --watch
```

This will keep your styles up-to-date.
