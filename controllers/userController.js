const User = require('../models/User');

// 1. (테스트용) 회원 강제 생성
// 실제로는 유저 앱에서 가입하지만, 지금 데이터가 없으니 관리자가 임의로 만듭니다.
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: '회원 생성 성공', user });
    } catch (error) {
        res.status(500).json({ message: '생성 실패', error: error.message });
    }
};

// 2. 전체 회원 조회 (검색 기능 추가)
exports.getAllUsers = async (req, res) => {
    try {
        // URL 쿼리에서 email이나 name이 있는지 확인
        const { email, name } = req.query;

        // 검색 조건(filter) 만들기
        let filter = {};

        if (email) {
            // 이메일이 정확히 일치하는 사람 찾기
            filter.email = email;
        }

        if (name) {
            // 이름은 '포함'된 사람 찾기 (예: '홍길' 검색 -> '홍길동' 나옴)
            // $regex는 몽고DB의 정규식 검색 연산자입니다.
            filter.name = { $regex: name, $options: 'i' }; // 'i'는 대소문자 무시
        }

        // 만들어진 조건(filter)으로 DB 검색
        const users = await User.find(filter).select('-password');

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 3. 특정 회원 상세 조회
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};

// 4. [핵심] 회원 정지/해제 (Ban)
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body; // 'banned' or 'active'

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // 업데이트된 정보 반환
        );

        if (!user) {
            return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: `회원 상태가 ${status}로 변경되었습니다.`, user });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
};