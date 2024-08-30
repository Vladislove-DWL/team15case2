import React from 'react';

const SoftLegend: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#E0E8F9',
                borderRadius: '8px',
            }}
        >
            <div style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#3F6EB0',
                        marginRight: '8px', // Отступ справа от круга
                    }}
                />
                <span>(синий круг) оценка поставленная самим пользователем</span>
            </div>

            <div style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#4BFF7A',
                        marginRight: '8px',
                    }}
                />
                <span>(зелёный круг) собирательная оценка от других пользователей</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: '#FFA41B',
                        marginRight: '8px',
                    }}
                />
                <span>(оранжевый круг) выставленная оценка другому пользователю</span>
            </div>
        </div>
    );
};

export default SoftLegend;
