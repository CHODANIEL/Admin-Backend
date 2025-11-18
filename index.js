require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // DB 연결 함수 불러오기

// 1. 라우터 파일 불러오기 (수정된 부분)
const authRoutes = require('./routes/auth');
// const roomRoutes = require('./routes/rooms'); // <- 이 줄을 삭제하거나 주석 처리
const accommodationRoutes = require('./routes/accommodations');
const partnerRoutes = require('./routes/partners');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admins');
const uploadRoutes = require('./routes/upload');
const promotionRoutes = require('./routes/promotions');


// DB 연결 실행
connectDB();

const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// 2. API 라우터 등록 (수정된 부분)
app.use('/api/auth', authRoutes);
// app.use('/api/rooms', roomRoutes); // <- 이 줄을 삭제하거나 주석 처리
app.use('/api/accommodations', accommodationRoutes); // <- 이 줄을 추가
app.use('/api/partners', partnerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/promotions', promotionRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ 서버가 ${PORT}번 포트에서 실행 중입니다.`);
});