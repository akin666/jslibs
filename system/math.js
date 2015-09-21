/**
 * Created by akin on 30.8.2015.
 */
/**
 * Created by akin on 30.8.2015.
 */
define(function () {
    var math = {
        MILLISECOND_TO_SECOND: 0.001,
        SECOND_TO_MILLISECOND: 1000,
        DEG2RAD: Math.PI / 180.0,
        RAD2DEG: 180.0 / Math.PI
    };

    math.isInside = function(x, y, w, h, x2, y2) {
        return (x2 >= x && x2 <= x + w && y2 >= y && y2 <= y + h);
    }
    math.isInsideCenter = function(x, y, w, h, x2, y2) {
        return (x2 >= x - w/2 && x2 <= x + w/2 && y2 >= y - h/2 && y2 <= y + h/2);
    };
    math.distance = function(pos1, pos2) {
        var diffX = pos2.x - pos1.x;
        var diffY = pos2.y - pos1.y;
        return Math.sqrt(diffX*diffX + diffY*diffY);
    }
    math.distanceSq = function(pos1, pos2) {
        var diffX = pos2.x - pos1.x;
        var diffY = pos2.y - pos1.y;
        return diffX*diffX + diffY*diffY;
    }
    math.length = function(vec) {
        return Math.sqrt((vec.x*vec.x)+(vec.y*vec.y));
    }
    math.clamp = function( value , min , max ) {
        return (value < min) ? min : ((value > max) ? max : value);
    }
    // http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
    math.modulo = function( a , n ) {
        return (value < min) ? min : ((value > max) ? max : value);
    }
    math.findClosestPoint = function( point , points ) {
        if(points == null || points.length < 1) {
            return -1;
        }
        var index = 0;
        var distance = math.distance( point , points[0] );
        var tmp = 0;
        for( var i = 1 ; i < points.length ; ++i ) {
            tmp = math.distance( point , points[ i ] );
            if( tmp < distance ) {
                distance = tmp;
                index = i;
            }
        }
        return index;
    }
    math.getPointDistance = function( point , points , index ) {
        if(points == null || points.length < 1) {
            return -1;
        }
        index = math.modulo( index , points.length );
        return math.distance( point , points[index] );
    }
    // http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
    math.getPointDistanceToLineSquared = function ( point , l1 , l2 ) {
        var linelen = math.distanceSq( l1 , l2 );
        if( linelen == 0 ) {
            return math.distanceSq( point , l1 );
        }
        var t = ((point.x - l1.x) * (l2.x - l1.x) + (point.y - l1.y) * (l2.y - l1.y)) / linelen;
        if( t < 0 ) {
            return math.distanceSq( point, l1 );
        }
        if( t > 1 ) {
            return math.distanceSq( point, l2 );
        }
        return math.distanceSq( point , { x: l1.x + t * (l2.x - l1.x) , y: l1.y + t * (l2.y - l1.y) } );
    }
    math.getPointDistanceToLine = function( point , l1, l2 ) {
        return Math.sqrt( math.getPointDistanceToLineSquared( point , l1, l2 ) );
    }
    math.dotProduct = function( a , b ) {
        return a.x * b.x + a.y * b.y;
    }
    math.getLineDistance = function( point , points , index ) {
        if(points == null || points.length < 1) {
            return -1;
        }
        var i1 = math.modulo( index , points.length );
        var i2 = math.modulo( i1 + 1 , points.length );

        return math.getPointDistanceToLine( point , points[i1] , points[i2] );
    }
    math.findClosestLine = function( point , points ) {
        if(points == null || points.length < 2) {
            return -1;
        }
        else if( points.length === 2 )
        {
            return 0;
        }

        var index = 0;
        var distance = math.getLineDistance( point , points , 0 );
        var tmp = 0;
        for( var i = 1 ; i < points.length ; ++i ) {
            tmp = math.getLineDistance( point , points , i );
            if( tmp < distance )
            {
                distance = tmp;
                index = i;
            }
        }
        return index;
    }

    // radians!
    // angle 0 is up
    // angle PI is down
    // angle PI/2 is right
    // Y positive is down
    // X positive is left
    math.angleToAxis = function( angle , magnitude ) {
        var vec = {
            x: Math.sin(angle) * magnitude,
            y: Math.cos(angle) * magnitude
        };

        return vec;
    }
    math.axisToAngle = function( axis ) {
        return Math.atan2( axis.y , axis.x );
    }
    math.polygonHitTest = function( point , points ) {
        // game coding complete 4th edition page 300.
        var inside = false;
        var size = points.length;

        if( size < 3 ) {
            return false;
        }

        for( var i = 0 ; i < size ; ++i ) {
            var curr = points[ i ];
            var prev = points[ (size - 1 + i) % size  ];

            if( curr.x > prev.x ) {
                if( (curr.x < point.x) == (point.x <= prev.x) && (point.y - prev.y) * (curr.x-prev.x) < (curr.y-prev.y) * (point.x-prev.x) ) {
                    inside = !inside;
                }
                continue;
            }
            if( (curr.x < point.x) == (point.x <= prev.x) && (point.y - curr.y) * (prev.x-curr.x) < (prev.y-curr.y) * (point.x-curr.x) ) {
                inside = !inside;
            }
        }
        return inside;
    }
    // The result depends on whether the Y axis points up or down.
    math.polygonWindingOrderCW = function( points , y_axis_up ) {
        if( y_axis_up == null ) {
            y_axis_up = true;
        }
        var area = 0;
        var size = points.length;
        for( var i = 0 ; i < size ; ++i ) {
            var av = points[ i ];
            var bv = points[ (i + 1) % size ];
            area += av.x * bv.y - bv.x * av.y;
        }
        area *= 0.5;

        if( yaxisup == null || y_axis_up === false ) {
            return area > 0;
        }
        return area < 0;
    }
    math.degToRad = function( angle ) {
        return angle * math.DEG2RAD;
    }
    math.radToDeg = function( angle ) {
        return angle * math.RAD2DEG;
    }
});
