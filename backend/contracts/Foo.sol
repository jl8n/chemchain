// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import 'hardhat/console.sol';


contract Greeter {
    string private greeting;
    address payable public owner;

    constructor(string memory _greeting) {
        console.log('deploying a greeter with greetings:', _greeting);
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log('Changin greeting from $s to $s', greeting, _greeting);
        greeting = _greeting;
    }
}
