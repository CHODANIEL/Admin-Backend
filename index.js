import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

<<<<<<< HEAD
// 공통 응답 포맷 (테스트용)
import { successResponse, errorResponse } from './common/response.js';

// === 라우트 파일 불러오기 ===
import authRoutes from './auth/route.js';
import businessRoutes from './business/route.js';
import userRoutes from './user/route.js';
import lodgingRoutes from './lodging/route.js';
import roomRoutes from './room/route.js';
import bookingRoutes from './booking/route.js';
import reviewRoutes from './review/route.js';
import categoryRoutes from './category/route.js';
import promotionRoutes from './promotion/route.js';
import dashboardRoutes from './dashboard/route.js';
=======
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

>>>>>>> upstream/main

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === API 연결 ===
app.use('/api/auth', authRoutes);
<<<<<<< HEAD
app.use('/api/businesses', businessRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lodgings', lodgingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/dashboard', dashboardRoutes);
=======
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


>>>>>>> upstream/main

// 기본 경로
app.get('/', (req, res) => {
    res.json(successResponse(null, "Admin Backend Server is Running! 🚀"));
});

// 404 에러 처리
app.use((req, res, next) => {
    res.status(404).json(errorResponse("API 경로를 찾을 수 없습니다.", 404));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});