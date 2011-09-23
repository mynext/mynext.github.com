(function($) {   

	$.fn.arrowFade = function(options) {
	
		options = $.extend({
			speed : 500,
			easingNav : 'easeOutBack',
			timeout : 5000,
			fxSlide : 'fade',
			navSlider : '#nav-slider ul',
			slider : '#slider .inner',
			activeItem : 'current',
			arrowClass : 'arrow'
			
		}, options);        
	
		return this.each(function() {   
            
		 	var nav = $(this),
		 		currentPageItem = $('.'+options.activeItem, nav);            
        
            var link_nav = $(options.navSlider+' a');
            var li_nav = $(options.navSlider+' li');                                                                  
		 		
            function move($element)
            {
                var blob = $('.'+options.arrowClass, nav);
                
            	blob.animate(
            		{
            			left : $element.position().left,
            			width : $element.width()
            		},
            		{
            			duration : options.speed,
            			easing : options.easingNav,
            			queue : false
            		}
            	);     
            }   
        		 		
		 	$('<li class="'+options.arrowClass+'"></li>').css({
		 		width : currentPageItem.width(),
		 		left : currentPageItem.position().left
		 	}).appendTo(this);
        
            link_nav.click(function() { 
                var index = link_nav.index(this);
                $(options.slider).cycle(index);
                
                $('.'+options.activeItem).removeClass(options.activeItem);
                $(this).parent('li').addClass(options.activeItem);
                
                return false;
            });  
        
            li_nav.click(function() { 
                var index = li_nav.index(this);
                $(options.slider).cycle(index);
                
                $('.'+options.activeItem).removeClass(options.activeItem);
                $(this).addClass(options.activeItem);
            });       
        
            $(options.slider).cycle({
                fx: options.fxSlide,
                speed: options.speed,
                timeout: options.timeout,
                cleartype:1,
                cleartypeNoBg:false,
                before: function(currSlideElement, nextSlideElement, args, forwardFlag){
                    $('.'+options.activeItem).removeClass(options.activeItem);
                    id = $(nextSlideElement).attr('id');
                    $(options.navSlider+' a[href="#'+id+'"]').parent('li').addClass(options.activeItem);    
                                                                         
                    index = $(options.slider+' > div').index(nextSlideElement);
                    sel = $(options.navSlider+' li:eq('+index+')');
                    
                    //alert('left: '+$(sel).offset().left+"\n width: "+$(sel).width());
                    
                    move(sel);  
                }
            });    
		 	
			$('li:not(.'+options.arrowClass+')', nav).click(function() {
				move($(this));
			});
		 	
			$('li:not(.'+options.arrowClass+') a', nav).click(function() {
				move($(this).parent('li'));
			});     
		
		}); // end each             
	
	};                                      

})(jQuery);      