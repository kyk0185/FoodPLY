import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

export default function Certification(props) {
    function callback(response) {
        console.log(response)
    }

    const data = {
        merchant_uid: `mid_${new Date().getTime()}`,
        company: '아임포트',
        carrier: 'SKT',
        name: props.route.params['name'],
        phone: props.route.params['phone'],
        min_age: '',
    }

    return (
        <IMP.Certification
            userCode={'imp10116320'}    // 가맹점 식별코드
            loading={<Loading />}   // 웹뷰 로딩 컴포넌트
            data={data}             // 본인인증 데이터
            callback={callback}     // 본인인증 종료 후 콜백
        />
    )
}
