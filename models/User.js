const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, '이메일을 입력해주세요.'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, '비밀번호를 입력해주세요.'],
        minlength: 6,
        select: false, // 조회 시 비밀번호는 기본적으로 제외 (보안)
    },
    name: {
        type: String,
        required: [true, '이름을 입력해주세요.'],
        trim: true,
    },
    phoneNumber: {
        type: String,
        default: '',
    },

    // [핵심] 관리자가 제어할 회원 상태
    status: {
        type: String,
        enum: ['active', 'banned', 'withdrawn'], // 활동중, 정지됨, 탈퇴함
        default: 'active',
    },

    // 소셜 로그인 여부 (나중에 확장 대비)
    provider: {
        type: String,
        default: 'local', // 'kakao', 'google' 등
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;