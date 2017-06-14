document.addEventListener('DOMContentLoaded', function() {

    function Modal(element) {
        this.el = element;
        this.closeButton = element.lastElementChild;
        this.parent = element.parentNode;
    }

    Modal.prototype.makeVisible = function() {
        this.el.classList.add('visible');
    }

    Modal.prototype.createOverlay = function() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        this.parent.insertBefore(this.overlay, this.el);
    }

    Modal.prototype.collapse = function() {
        var modal = this;
        // this.parent.removeChild(this.overlay);
        this.overlay.remove();
        this.el.classList.remove('visible');
        this.close = null;
        this.overlay.removeEventListener('click', this.collapse.bind(modal));
    }

    Modal.prototype.events = function() {
        var modal = this;
        this.overlay.addEventListener('click', this.collapse.bind(modal));
        this.closeButton.addEventListener('click', this.collapse.bind(modal));
        window.addEventListener('keydown', function(e) {
            if (e.which == 27) {
                modal.collapse();
            }
        });
    }

    var video = document.querySelector('.videos');
    video.addEventListener('click', function(e) {
        var target = e.target;
        if (target.classList.contains('videos__details')) {
            e.preventDefault();
            var modal = new Modal(target.nextElementSibling);
            modal.makeVisible();
            modal.createOverlay();
            modal.events();
        }
    });
});
