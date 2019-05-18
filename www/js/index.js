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
    // width: window.innerWidth * window.devicePixelRatio,
    // height: window.innerHeight * window.devicePixelRatio,
    width: 400,
    height: 512,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var map;
var sy = 0;
var mapWidth = 5;
var mapHeight = 9;

function preload() {
    this.load.image('tiles', '../img/tileset.png');
}

function create() {
    //var g1 = this.add.grid(160, 256, 320, 512, 64, 64, 0x000).setAltFillStyle(0xffffff).setOutlineStyle();
    //var g2 = this.add.grid(160, 768, 320, 512, 64, 64, 0x000).setAltFillStyle(0xffffff).setOutlineStyle();
    var mapData = [];

    for (var y = 0; y < mapHeight; y++)
    {
        var row = [];

        for (var x = 0; x < mapWidth; x++)
        {
            var tileIndex = (x + y) % 2;

            row.push(tileIndex);
        }

        mapData.push(row);
    }

    map = this.make.tilemap({ data: mapData, tileWidth: 64, tileHeight: 64 });

    var tileset = map.addTilesetImage('tiles');
    var layer = map.createDynamicLayer(0, tileset, (400-(mapWidth*64))/2, -64);
}    

function update (time, delta) 
{
    //  Any speed as long as 64 evenly divides by it
    sy -= 0.5;

    if (sy === -64)
    {
        //  Reset and create new strip

        var tile;
        var prev;

        for (var x = 0; x < mapWidth; x++)
        {
            for (var y = mapHeight - 1; y >= 0; y--)
            {
                tile = map.getTileAt(x, y);
                if (y === 0)
                {
                    prev = map.getTileAt(x, y + 1);
                    tile.index = prev.index === 0 ? 1 : 0;
                } else {
                    prev = map.getTileAt(x, y - 1);
                    tile.index = prev.index;
                }
            }
        }

        sy = 0;
    }

    this.cameras.main.scrollY = sy;
}