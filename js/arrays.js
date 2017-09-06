// locations to be used on the map
var locations =  [{
        title: 'Christchurch',
        location: {
            lat: -43.532054,
            lng: 172.636225
        }
    },
    {
        title: 'Milford Sound',
        location: {
            lat: -44.641402,
            lng: 167.89738
        }
    },
    {
        title: 'Queenstown',
        location: {
            lat: -45.031162,
            lng: 168.662644
        }
    },
    {
        title: 'Fox Glacier',
        location: {
            lat: -43.46448,
            lng: 170.017588
        }
    },
    {
        title: 'Wellington',
        location: {
            lat: -41.28646,
            lng: 174.776236
        }
    },
    {
        title: 'Lake Taupo',
        location: {
            lat: -38.791557,
            lng: 175.915039
        }
    },
    {
        title: 'Rotorua',
        location: {
            lat: -38.136848,
            lng: 176.249746
        }
    },
    {
        title: 'Coromandel Peninsula',
        location: {
            lat: -36.833333,
            lng: 175.583333
        }
    },
    {
        title: 'Bay of Islands',
        location: {
            lat: -35.18437,
            lng: 174.164616
        }
    },
    {
        title: 'Auckland',
        location: {
            lat: -36.84846,
            lng: 174.763332
        }
    },
];

//styles the map
    var styles = [{
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#e0efef"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "hue": "#1900ff"
                },
                {
                    "color": "#c0e8e8"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                    "lightness": 100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "lightness": 700
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#7dcdcd"
            }]
        }
    ];
