/* Modals - Tags */

Mailpile.UI.Modals.TagAdd = function(add_tag_data) {
  var $elem = $('#add-tag');
  if ($elem.length > 0) {
    $elem.eq(0).trigger('click');
  }
  else {
    Mailpile.API.with_template('modal-add-tag', function(modal) {
      Mailpile.UI.show_modal(modal(add_tag_data));
    });
  }
};

Mailpile.UI.Modals.TagAddProcess = function(location) {
  var tag_data = $('#modal-form-tag-add').serialize();
  Mailpile.API.tags_add_post(tag_data, function(result) {
    var tag_template = Mailpile.safe_template($('#template-sidebar-item').html());
    if (result.status == 'success' && location == 'sidebar') {
      var tag_html = tag_template(result.result.added[0]);
      $('#sidebar-tag').prepend(tag_html);
      Mailpile.UI.prepare_new_content('#sidebar-tag');

      // FIXME: these drag & drops probably break on non search views

      Mailpile.UI.hide_modal();
    } else {
      Mailpile.notification(result);
    }
  });
};
