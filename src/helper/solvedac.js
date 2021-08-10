export function getTierColor(tier) {
	switch (tier) {
		// Unrated
		case 0:
			return 'rgb(45, 45, 45)';
		// Bronze V ~ I
		case 1:
			return 'rgb(157, 73, 0)';
		case 2:
			return 'rgb(165, 79, 0)';
		case 3:
			return 'rgb(173, 86, 0)';
		case 4:
			return 'rgb(181, 93, 10)';
		case 5:
			return 'rgb(181, 93, 10)';
		// Silver V ~ I
		case 6:
			return 'rgb(56, 84, 110)';
		case 7:
			return 'rgb(61, 90, 116)';
		case 8:
			return 'rgb(67, 95, 122)';
		case 9:
			return 'rgb(73, 101, 128)';
		case 10:
			return 'rgb(78, 106, 134)';
		// Gold V ~ I
		case 11:
			return 'rgb(210, 133, 0)';
		case 12:
			return 'rgb(223, 143, 0)';
		case 13:
			return 'rgb(236, 154, 0)';
		case 14:
			return 'rgb(249, 165, 24)';
		case 15:
			return 'rgb(255, 176, 40)';
			return 'rgb(236, 154, 0)';
		// Platinum V ~ I
		case 16:
			return 'rgb(0, 199, 139)';
		case 17:
			return 'rgb(0, 212, 151)';
		case 18:
			return 'rgb(39, 226, 164)';
		case 19:
			return 'rgb(62, 240, 177)';
		case 20:
			return 'rgb(81, 253, 189)';
		// Diamond V ~ I
		case 21:
			return 'rgb(0, 158, 229)';
		case 22:
			return 'rgb(0, 169, 240)';
		case 23:
			return 'rgb(0, 180, 252)';
		case 24:
			return 'rgb(43, 191, 255)';
		case 25:
			return 'rgb(65, 202, 255)';
		// Ruby V ~ I
		case 26:
			return 'rgb(224, 0, 76)';
		case 27:
			return 'rgb(234, 0, 83)';
		case 28:
			return 'rgb(245, 0, 90)';
		case 29:
			return 'rgb(255, 0, 98)';
		case 30:
			return 'rgb(255, 48, 113)';
	}
}
