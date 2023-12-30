const AWS = require('aws-sdk');

// Set your AWS region
AWS.config.update({ region: 'YOUR_REGION' }); // e.g., 'us-east-1'

const generateSignedUrl = async () => {
  // Specify the bucket and object key
  const bucketName = 'your-bucket-name';
  const objectKey = 'path/to/your/object.txt'; // Replace with the actual object key

  // Create an S3 instance
  const s3 = new AWS.S3();

  // Generate a pre-signed URL
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Expires: 60, // The URL will expire in 60 seconds
  };

  try {
    // Generate a pre-signed URL using the configured credentials
    const preSignedUrl = s3.getSignedUrl('getObject', params);

    console.log('Pre-signed URL:', preSignedUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ preSignedUrl }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

module.exports = {
    generateSignedUrl
}