const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

// 1. S3 클라이언트 설정
const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// 2. 업로드 미들웨어 설정 (Multer-S3)
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME, // .env에 버킷 이름 필수!
        key: function (req, file, cb) {
            // 파일 이름 중복 방지를 위해 '날짜-랜덤숫자.확장자' 형식으로 저장
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = path.extname(file.originalname);
            cb(null, `uploads/${uniqueSuffix}${extension}`);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // 파일 타입 자동 감지
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

// 3. 업로드 API 엔드포인트
// POST /api/upload
// 헤더: Authorization (Admin 토큰)
// 바디: form-data, Key: "image", Value: (파일 선택)
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }

    // 업로드된 파일의 S3 URL을 반환
    res.status(200).json({
        message: '이미지 업로드 성공',
        imageUrl: req.file.location, // 이 URL을 프론트엔드가 받아서 사용
    });
});

module.exports = router;