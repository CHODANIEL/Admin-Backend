const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // 구분: 'amenity'(편의시설) 또는 'region'(지역)
    type: {
        type: String,
        required: [true, '카테고리 타입을 입력해주세요 (amenity/region).'],
        enum: ['amenity', 'region'],
    },
    // 이름: '와이파이', '수영장', '서울', '제주' 등
    name: {
        type: String,
        required: [true, '카테고리 이름을 입력해주세요.'],
        trim: true,
    }
}, {
    timestamps: true
});

// [중요] 중복 방지
// 같은 type 안에서 같은 name이 존재할 수 없도록 복합 인덱스 설정
// 예: 'amenity' 타입에 '와이파이'가 있는데 또 '와이파이'를 만들 수 없음
categorySchema.index({ type: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;