const helpers = require("./../helpers");
const elasticsearch = require("elasticsearch");
const elasticClient = new elasticsearch.Client({
    host: "database:9200"
    // log: "warn"
});
const PIPELINE_ID = "pdf-pipeline-processor";
const INDEX_ID = "hiremelater";
const DOCUMENT_TYPE = "file";

// Creates the pipeline necessary to process the files
exports.createPipeline = async function() {
    let canConnect = false;
    let shouldExit = false;
    // Ping the ES service as it takes longer to initialize than the time the container itself takes to start
    while (!canConnect && !shouldExit) {
        try {
            await elasticClient.ping({
                requestTimeout: 15000
            });
            canConnect = true;
        } catch (error) {
            if (error.message !== "No Living connections") {
                shouldExit = error;
            }
            await helpers.sleep(5000);
        }
    }

    // This should be sent to logs if we can't connect to ES other than the service being down / not initialized
    if (shouldExit) {
        console.log(shouldExit);
    }

    // If the connection was successfull create the pipeline for the file indexing
    if (canConnect) {
        elasticClient.ingest.putPipeline({
            id: PIPELINE_ID,
            body: {
                description: "Extract attachment information",
                processors: [
                    {
                        attachment: {
                            field: "data"
                        }
                    }
                ]
            }
        });
    }
};

exports.indexDocument = async function(document, metadata) {
    const response = await elasticClient.index({
        index: INDEX_ID,
        type: DOCUMENT_TYPE,
        pipeline: PIPELINE_ID,
        body: {
            data: document,
            metadata: metadata
        }
    });

    return response;
};

function mapDocumentToResponse(document) {
    const response = {};
    response.file = document._source.data;
    response.email = "";
    response.name = document._source.attachment.author || "";
    if (document._source.metadata) {
        response.email = document._source.metadata.email;
        response.name = document._source.metadata.name || response.name;
    }

    return response;
}

exports.fetchDocuments = async function(offset = 0) {
    const response = await elasticClient.search({
        index: INDEX_ID,
        from: offset,
        size: 15
    });

    return {
        total: response.hits.total,
        data: response.hits.hits.map((hit) => mapDocumentToResponse(hit))
    };
};
