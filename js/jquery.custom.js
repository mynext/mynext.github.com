jQuery(document).ready(function($){ 

	$('body').removeClass('no_js'); 
        
    $('.news-home ul').cycle({
        fx: "scrollDown",
        easing: "easeOutCubic",
        speed: 600,
        timeout: 5000
    });                 
    
//     removeFilter = function (el) {
//     	if (!$.support.opacity && el.style.filter) {
//     		try { el.style.removeAttribute('filter'); }
//     		catch(smother) {} // handle old opera versions
//     	}
//     };            
    
    $('#nav li > ul.sub-menu li').each(function(){
        n = $('ul.sub-menu', this).length;
        
        if(n) $(this).addClass('sub');
    });
    
    $('#nav ul > li').hover(
        function()
        {
            $('ul.sub-menu:not(ul.sub-menu li > ul.sub-menu)', this).fadeIn(300);    
        },
    
        function()
        {
            $('ul.sub-menu:not(ul.sub-menu li > ul.sub-menu)', this).fadeOut(200);    
        }
    );               
    
    $('ul.sub-menu li', this).hover(
        function()
        {
            var options;
            
            winWidth = $(document).width();
            subMenuWidth = $(this).outerWidth();
            space = $(this).offset().left + subMenuWidth * 2;
            
            if(space < winWidth) options = {left:subMenuWidth};
            else options = {left:subMenuWidth*-1};
            
            $('ul.sub-menu', this).hide().css(options).fadeIn(300);
        },
    
        function()
        {
            $('ul.sub-menu', this).fadeOut(200);
        }
    ); 
    
    
    
    $('img:not(.nofade, #slider img, img.icon, #slider-full-width img, a.thumb img)').hover(
        
        function(){ $(this).stop().animate({opacity:0.6}, 500); },
        function(){ $(this).stop().animate({opacity:1}, 500); }
    
    );      
    
    $("a[rel^='prettyPhoto']").prettyPhoto({
        slideshow:5000, 
        autoplay_slideshow:false,
        show_title:false
    });
    
    $('a.thumb').hover(
                            
        function()
        {
            $('<a class="zoom">zoom</a>').appendTo(this).css({dispay:'block', opacity:0}).animate({opacity:0.4}, 500);
        },
        
        function()
        {           
            $('.zoom').fadeOut(500, function(){$(this).remove()});
        }
    );

    $('a.socials').tipsy({fade:true, gravity:'s'});
    
    $('.toggle-content').hide();
    $('.toggle-title').click(function(){
        $(this).next().slideToggle(300);
        $(this).children('span.open-toggle').toggleClass('closed');
        $(this).attr('title', ($(this).attr('title') == 'Close') ? 'Open' : 'Close');
        return false;
    });     
    
    $('.tabs-container').tabs();                                       
    $('.tabs-container').tabs( "option", "fx", { opacity: 'toggle' } );
    
    // contact                           
    var error = true;      
    
    function addLoading()
    {
		$('#sendbutton').val('wait...').attr('disabled', true);
	}    
    
    function removeLoading()
    {
		$('#sendbutton').val('Send').attr('disabled', false);
	}
	
	function addError(msg, e)
	{
		error = true;
		$(e).addClass('error');
		$('#usermessagea').html(msg);	
	}
	
	function removeError(e)
	{
		error = false;
		$('#usermessagea').html('');     
		$(e).removeClass('error');
	}
	
	$('#email').blur(function(){             
		var expr = /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/;
		
		if( !expr.test( $(this).val() ) )  
			addError('<p class="error">Email is incorrect!</p>', this);            
		else 
			removeError(this);
	});
    	
	$('#form-contact .required').blur(function(){
		if( $(this).val() == '' )
			addError('<p class="error">One or more field required are empty!</p>', this);
		else               
			removeError(this);
	});
    
	$('#form-contact').submit(function(){
		if( !error )
		{                                                
			var datastring = '';
			
			$('#form-contact input, #form-contact select, #form-contact textarea').each(function(){
				datastring = datastring + $(this).attr('name') + "=" + $(this).val() + '&';
			});
			
			$('#usermessagea').html(''); 
			addLoading();
			
			$.post( $(this).attr('action'), datastring, function(response){
				$('#usermessagea').html(response);
				removeLoading();	
			});
		}
		else    
			addError('<p class="error">One or more field aren\'t filled correctly!</p>', this);
		
		return false;
	});
});