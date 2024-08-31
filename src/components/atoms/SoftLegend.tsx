import '../../index.css'

const SoftLegend: React.FC = () => {
    return (
        <div className="soft-legend">
            <div className="legend-item">
                <div className="legend-circle blue-circle" />
                <span>(синий круг) оценка поставленная самим пользователем</span>
            </div>

            <div className="legend-item">
                <div className="legend-circle green-circle" />
                <span>(зелёный круг) собирательная оценка от других пользователей</span>
            </div>

            <div className="legend-item">
                <div className="legend-circle orange-circle" />
                <span>(оранжевый круг) выставленная оценка другому пользователю</span>
            </div>
        </div>
    );
};

export default SoftLegend;