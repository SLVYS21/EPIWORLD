const crypto = require('crypto')
const sharp = require('sharp');
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");
const uniqueName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.BUCKET_REGION
})

const uploadImg = async(file) => {
    try {
        if (!file)
            return null;
        const name = uniqueName();
        const buffer = await sharp(buffer).resize({
            height: 1080,
            width: 1920,
            fit: "contain"
        }).toBuffer();
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
            Body: buffer,
            ContentType: file.mimetype,
        }
        const send_command = new PutObjectCommand(params);
        await s3.send(send_command);

        const get_command = new GetObjectCommand(params);
        const url = getSignedUrl(s3, get_command, {expiresIn: 3600});
        return {
            name,
            url
        }
    } catch (error) {
        return null;
    }
}

const getImgUrl = async(name) => {
    try {
        if (!file) {
            return null;
        }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: name
        };
        const command = new DeleteObjectCommand(params);
        const url = getSignedUrl(s3, command, {expiresIn: 3600});
        return {
            url
        }
    } catch (error) {
        return null;
    }
}

const deleteImg = async(imageName) => {
    try {
        if (!file) {
            return null;
        }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName
        };
        const command = new GetObjectCommand(params);
        const response = await s3.send(command);
        return {
            deleted: (response) ? true : false
        }
    } catch (error) {
        return null;
    }
}

module.exports = {
    upload: uploadImg,
    get: getImgUrl,
    delete: deleteImg
}
