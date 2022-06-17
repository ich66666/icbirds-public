
    var viewer = OpenSeadragon({
        id: "openseadragon",
        prefixUrl: "/openseadragon/images/",
        navigatorSizeRatio: 1,
        visibilityRatio: 1.0,
        //minPixelRatio: 1.0,
        immediateRender: true,
        maxZoomLevel: 18,
        minZoomLevel: 0,
        defaultZoomLevel: 2, // set this so we can see inidvidual punks on page load, but it seems I can't zoom out then
        minZoomImageRatio: 1.0,
        maxZoomImageRatio: 1.0,
        smoothTileEdgesMinZoom: Infinity,
        tileSources: {
          height: 9000,
          width: 9000,
          tileSize: 300,
          tileOverlap: 0,
          blendTime: 0,
          minLevel: 0,
          maxLevel: 5,
          getTileUrl: function (level, x, y) {
            console.log("Level: " + level + ", x: " + x + ", y: " + y);
            return "/images/icbirdstiles/" +
              (level) + "/" + x + "_" + y + ".png";
          }
        }
      });
  
      var hitTest = function (position) {
        var box;
        var count = viewer.world.getItemCount();
        for (var i = 0; i < count; i++) {
          box = viewer.world.getItemAt(i).getBounds();
          if (position.x > box.x &&
            position.y > box.y &&
            position.x < box.x + box.width &&
            position.y < box.y + box.height) {
            return i;
          }
        }
  
        return -1;
      };
  
      var $viewerElement = $('#seadragon-viewer')
        .on('mousemove', function (event) {
          var pixel = new OpenSeadragon.Point(event.clientX, event.clientY);
          pixel.y -= $viewerElement.position().top;
          var index = hitTest(viewer.viewport.pointFromPixel(pixel));
          $('.output').text(index === -1 ? '' : 'Image ' + index);
        });
  
      viewer.addHandler('canvas-click', function (event) {
        if (!event.quick) {
          return;
        }
  
        var index = hitTest(viewer.viewport.pointFromPixel(event.position));
        if (index !== -1) {
          viewer.viewport.fitBounds(viewer.world.getItemAt(index).getBounds());
        }
      });