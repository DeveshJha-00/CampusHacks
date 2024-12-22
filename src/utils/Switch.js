/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import "../components/customStyles/Switch.css"
const Switch = () => {
    return (
        <label className="relative inline-block w-14 h-8">
            <input type="checkbox" className="opacity-0 w-0 h-0" />
            <span className="absolute inset-0 rounded-full bg-[#28096b] transition-colors duration-500 ease-in-out">
        <span className="absolute left-1 bottom-1 w-6 h-6 rounded-full bg-[#28096b] transition-transform duration-500 ease-in-out" />
      </span>
        </label>
    );
};

export default Switch;