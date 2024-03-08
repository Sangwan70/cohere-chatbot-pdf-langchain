## **Cohere & LangChain - Create a Chatbot for PDF Files**

**1. Fork the repo to your Github account, so that you can change the code and add/finetune the features.**

https://github.com/Sangwan70/cohere-chatbot-pdf-langchain.git

**2. Clone the forked repo or download the ZIP to machine**

git clone https://github.com/Sangwan70/cohere-chatbot-pdf-langchain.git

**3. Change to cloned repository and Install packages**

```
cd cohere-chatbot-pdf-langchain

npm install yarn -g
```
to install yarn globally (if you haven't already).

Then run:

```
yarn install

```
After installation, you should see a node_modules folder.

**4. Set up your .env file. Copy .env.example into .env Your .env file should look like this:**

```
COHERE_API_KEY=
# Update these with your pinecone details from your dashboard.
# PINECONE_INDEX_NAME is in the indexes tab under "index name" in blue
# PINECONE_ENVIRONMENT is in indexes tab under "Environment".
# Example: "us-east1-gcp"
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX_NAME=
```

-   Visit **Cohere** to retrieve API keys and insert into your .env file.
-   Visit [pinecone](https://pinecone.io/) to create and retrieve your API keys, and also retrieve your environment and index name from the dashboard.

**5. For your own pinecone Vector Database. In the config folder, replace the _PINECONE_NAME_SPACE_ with a namespace where you'd like to store your embeddings on Pinecone when you run npm run ingest. This namespace will later be used for queries and retrieval.**

**6. In utils/makechain.ts chain change the QA_PROMPT for your own use case. Please verify outside this repo that you have access to cohere api, otherwise the application will not work.**

**Convert your PDF files to embeddings**

- Inside docs folder (Create the Folder if needed), add your pdf files or folders that contain pdf files.

- Run the script
```
yarn run ingest
```

To 'ingest' and embed your docs. If you run into errors troubleshoot below.

- Check Pinecone dashboard to verify your namespace and vectors have been added.

**Run the app**

Once you've verified that the embeddings and content have been successfully added to your Pinecone, you can run the app with
```

npm run dev

```

To launch the local dev environment, and then type a question in the chat interface.

Launch the browser and open http://localhost:3000



**Troubleshooting**

In general, keep an eye out in the issues and discussions section of this repo for solutions.

**General errors**

-   Make sure you're running the latest Node version. Run node -v
-   Try a different PDF or convert your PDF to text first. It's possible your PDF is corrupted, scanned, or requires OCR to convert to text.
-   Console.log the env variables and make sure they are exposed.
-   Make sure you're using the same versions of LangChain and Pinecone as this repo.
-   Check that you've created an .env file that contains your valid (and working) API keys, environment and index name.
-   If you change modelName in OpenAI, make sure you have access to the api for the appropriate model.
-   Make sure you have enough OpenAI credits and a valid card on your billings account.
-   Check that you don't have multiple OPENAPI keys in your global environment. If you do, the local env file from the project will be overwritten by systems env variable.
-   Try to hard code your API keys into the process.env variables if there are still issues.

**Pinecone errors**

-   Make sure your pinecone dashboard environment and index matches the one in the pinecone.ts and .env files.
-   Check that you've set the vector dimensions to 1536.
-   Make sure your pinecone namespace is in lowercase.
-   Pinecone indexes of users on the Starter(free) plan are deleted after 7 days of inactivity. To prevent this, send an API request to Pinecone to reset the counter before 7 days.
-   Retry from scratch with a new Pinecone project, index, and cloned repo.
