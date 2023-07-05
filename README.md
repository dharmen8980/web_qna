# Topic Search and Question Answering Program

This program accepts a topic as a string input from the user, searches the internet for information about it, and answers any questions regarding the topic.

## Dependencies

The following packages are used in this program:

- `openai`: Provides access to OpenAI GPT-3 models for natural language processing.
- `google-it`: Enables searching the web and collecting URLs of search results.
- `wiki-js`: Allows searching and extracting content from Wikipedia.
- `cheerio`: Parses and traverses HTML content.

## Program Workflow

1. The program first searches for the given topic in Wikipedia and extracts the whole content or summary, as required.
2. If the content is not found on Wikipedia, it searches the web and collects the URLs of the search results.
3. It then visits each URL and extracts the content from it.
4. The extracted content is then fed to the OpenAI GPT-3.5-turbo model as a system message.
5. The chat model reads the content and is able to provide any possible questions related to that topic.

## Usage

1. Install the required packages by running `npm install` or `yarn install`.
2. Make sure you have valid API credentials for OpenAI.
3. Replace the API/route in the program with your own API route if you want to run this program on your machine.
   - The current API route used in the program is `https://web-qna.vercel.app/api/[askQuestions/getTopic]`.
   - You can replace it with your own API route to handle the topic and question processing logic.
4. Run the program and provide the topic you want to search for.
5. The program will display the extracted content and allow you to ask questions related to the topic.

## Website

The program is also hosted on Vercel and can be accessed through the following website: [https://web-qna.vercel.app/]

Feel free to explore and modify the program to suit your specific needs.

