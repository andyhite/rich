/*
* Embed Media Dialog based on http://www.fluidbyte.net/embed-youtube-vimeo-etc-into-ckeditor
*
* Plugin name:      glossary
* Menu button name: Glossary
*
* Youtube Editor Icon (to change the icon)
* http://paulrobertlloyd.com/
*
* @author Joseph Chai, Dhendy Ferdian [loanstreet.com.my]  
* @version 0.1
*/
( function() {
    CKEDITOR.plugins.add( 'Glossary',
    {
        init: function( editor )
        {
           var me = this;
           CKEDITOR.dialog.add( 'GlossaryDialog', function ()
           {
              return {
                 title : 'Select Glossary',
                 minWidth : 550,
                 minHeight : 200,
                 contents :
                       [
                          {
                             id : 'iframe',
                             expand : true,
                             elements :[{
                                id : 'embedGlossary',
                                type : 'select',
                                label : 'Select glossary to add into article',
                                'autofocus':'autofocus',
                                items: [],
                                className: 'glossary-select',
                                onChange: function (){
                                },
                                setup: function(element){
                                },
                                commit: function(element){
                                }
                              }]
                          }
                       ],
                  onShow : function() {
                    $.get( "/glossary/get_glossary_key", function(data) {
                      for (var i=0; i<data.length; i++) {                        
                        $('.glossary-select').append('<option value="'+data[i][0]+'">'+data[i][1]+'</option>');
                      }
                    }, "json" );
                  },
                  onOk : function() {
                    var glossaryID = $(".glossary-select :selected").val();
                    var selectedText = editor.getSelection().getSelectedText();
                    var insertGlossaryHtml = "<a href='#' data-glossary-id='"+glossaryID+"'>" + selectedText + "</a>";
                    editor.insertHtml(insertGlossaryHtml);
                 }
              };
           } );

            editor.addCommand( 'GlossaryEmbed', new CKEDITOR.dialogCommand( 'GlossaryDialog' ) );

            editor.ui.addButton( 'Glossary',
            {
                label: 'Select Glossary',
                command: 'GlossaryEmbed',
                icon: this.path + 'images/icon.png'
            } );
        }
    } );
} )();
