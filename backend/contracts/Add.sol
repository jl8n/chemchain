// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 < 0.9.0;

contract Add {
    uint256 num1;
    uint256 num2;
    uint256 num3;

    function Sum(uint256 _num1, uint256 _num2) public {
        num3 = _num1 + _num2;
    }

    function getSum() public view returns (uint256) {
        return num3;
    }
}
