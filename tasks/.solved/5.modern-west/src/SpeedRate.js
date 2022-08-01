const SpeedRate = function() {
    let speedRate = 1;

    function set(value) {
        speedRate = value;
    }

    function get() {
        return speedRate;
    }

    return {
        set,
        get
    };
}();

export const setSpeedRate = SpeedRate.set;
export const getSpeedRate = SpeedRate.get;

export default SpeedRate;
