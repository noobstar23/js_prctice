/**
 * 
 */
jQuery(function() {
	jQuery("p").click(function() {
		const sample = ['car','dog','house'];
		let a ='';
		for (let x of sample) {
			a += x + '\n';
		}
		jQuery("p").text(sample[2]);
	});   
}); 