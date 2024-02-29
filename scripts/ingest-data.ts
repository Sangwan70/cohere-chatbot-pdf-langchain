import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { COHERE_API_KEY, COHERE_API_KEY } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

/* Name of directory to retrieve your files from 
   Make sure to add your PDF files inside the 'docs' folder
*/
const filePath = 'docs';

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new PDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new CohereEmbeddings({
       apiKey: COHERE_API_KEY,  // In Node.js defaults to process.env.COHERE_API_KEY
       batchSize: 48, // Default value if omitted is 48. Max value is 96
     });
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
