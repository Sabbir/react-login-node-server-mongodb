exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to the App!");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.initiateContract = (req, res) => {
    console.log(res);
    const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');
    const fs = require('fs');
    try {
        // Initial setup, create credentials instance.
        const credentials =  PDFToolsSdk.Credentials
            .serviceAccountCredentialsBuilder()
            .fromFile("pdftools-api-credentials.json")
            .build();
     
        // Create an ExecutionContext using credentials and create a new operation instance.
        const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
            createPdfOperation = PDFToolsSdk.CreatePDF.Operation.createNew();
    
        // Set operation input from a source file.
        const input = PDFToolsSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
        console.log(input);
        createPdfOperation.setInput(input);

        createPdfOperation.execute(executionContext)
       .then(result => {
           
        
            if (fs.existsSync('output/createPDFFromDOCX.pdf')) {
              fs.unlink('output/createPDFFromDOCX.pdf',(err) => {
                if (err) {
                    console.log("failed to delete file:"+err);
                } else {
                    console.log('successfully deleted old file ');                                
                }
                });
            }
          
           result.saveAsFile('output/createPDFFromDOCX.pdf')
           .then(r => {
            res.status(200).send(r);
           })
           .catch(err =>{
            console.log(err);
            res.status(500).send(err.Error);

           });
           console.log(result);
           
           
        })
       .catch(err => {
           if(err instanceof PDFToolsSdk.Error.ServiceApiError
               || err instanceof PDFToolsSdk.Error.ServiceUsageError) {
               console.log('Exception encountered while executing operation', err);
               res.status(400).send(err);
           } else {
               console.log('Exception encountered while executing operation', err);
               res.status(400).send(err);
           }
       });
    }
    catch (err) {
        res.status(400).send(err);
    }

};