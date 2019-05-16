/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var config = {
    type: Phaser.WEBGL,
    parent: 'game',
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var sx = 0;

function preload() {
}

function create() {
    var g1 = this.add.grid(160, 256, 320, 512, 64, 64, 0x000).setAltFillStyle(0xffffff).setOutlineStyle();
    var g2 = this.add.grid(160, 768, 320, 512, 64, 64, 0x000).setAltFillStyle(0xffffff).setOutlineStyle();
}    

function update (time, delta) 
{
    sx -= 2;
    if (sx === -512)
    {
        this.g2.
        sx = 0;
    }
    this.cameras.main.scrollY = sx;
}