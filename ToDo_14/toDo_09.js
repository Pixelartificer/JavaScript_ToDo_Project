document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // ELEMENTS
  // ==============================

  const nameInput = document.getElementById("nameInput");
  const postText = document.getElementById("postText");
  const postBtn = document.getElementById("postBtn");

  const photoBtn = document.getElementById("photoBtn");
  const videoBtn = document.getElementById("videoBtn");
  const emojiBtn = document.getElementById("emojiBtn");
  const locationBtn = document.getElementById("locationBtn");
  const linkBtn = document.getElementById("linkBtn");

  const postsContainer = document.getElementById("postsContainer");
  const postCount = document.getElementById("postCount");
  const filePreview = document.getElementById("filePreview");
  const searchInput = document.getElementById("searchInput"); // New Search Element

  // ==============================
  // CHECK HTML ELEMENTS
  // ==============================

  if (
    !nameInput ||
    !postText ||
    !postBtn ||
    !photoBtn ||
    !videoBtn ||
    !emojiBtn ||
    !locationBtn ||
    !linkBtn ||
    !postsContainer ||
    !postCount ||
    !filePreview ||
    !searchInput
  ) {
    console.error("Required HTML element is missing. Please check your IDs.");
    return;
  }

  // ==============================
  // DATA
  // ==============================

  let posts = [];
  let selectedImage = null;
  let selectedVideo = null;

  // ==============================
  // HIDDEN FILE INPUTS
  // ==============================

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = "image/*";
  imageInput.style.display = "none";

  const videoInput = document.createElement("input");
  videoInput.type = "file";
  videoInput.accept = "video/*";
  videoInput.style.display = "none";

  document.body.appendChild(imageInput);
  document.body.appendChild(videoInput);

  // ==============================
  // MODAL SYSTEM
  // ==============================

  const modalOverlay = document.createElement("div");
  modalOverlay.id = "modernModal";
  modalOverlay.className =
    "fixed inset-0 z-[9999] hidden items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md";
  document.body.appendChild(modalOverlay);

  const modalBox = document.createElement("div");
  modalBox.className =
    "relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl backdrop-blur-2xl";
  modalOverlay.appendChild(modalBox);

  function openModal(content) {
    modalBox.innerHTML = "";
    modalBox.appendChild(content);

    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");

    requestAnimationFrame(() => {
      modalBox.classList.remove("scale-95", "opacity-0");
      modalBox.classList.add("scale-100", "opacity-100");
    });
  }

  function closeModal() {
    modalBox.classList.remove("scale-100", "opacity-100");
    modalBox.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      modalOverlay.classList.add("hidden");
      modalOverlay.classList.remove("flex");
    }, 180);
  }

  modalBox.classList.add(
    "scale-95",
    "opacity-0",
    "transition-all",
    "duration-200",
  );

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // ==============================
  // HELPER
  // ==============================

  function createElement(tag, classes = "", text = "") {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (text) element.textContent = text;
    return element;
  }

  // ==============================
  // EMOJI DATA
  // ==============================

  const emojiGroups = {
    "😀 Smileys": [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
      "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
      "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳",
      "🤩", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
      "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
      "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
      "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯",
      "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
      "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕"
    ],
    "❤️ Hearts": [
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
      "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💯",
      "💋", "💌", "💎", "✨", "🌟", "⭐", "💫", "🔥"
    ],
    "👍 Gestures": [
      "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
      "👆", "👇", "☝️", "✋", "🤚", "🖐️", "🖖", "👏", "🙌", "👐",
      "🤲", "🙏", "💪", "👀", "👋", "🤝", "✍️"
    ],
    "🌸 Nature": [
      "🌸", "🌹", "🌺", "🌻", "🌼", "🌷", "🌱", "🌿", "🍀", "☘️",
      "🌳", "🌴", "🌵", "🌲", "🌈", "☀️", "🌤️", "⛅", "🌧️", "⛈️",
      "❄️", "☃️", "🌙", "🌎", "🌍", "🌏", "⭐", "🌟", "🔥", "💧"
    ],
    "🍔 Food": [
      "🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍒", "🍑", "🍍", "🥭",
      "🍌", "🥝", "🍕", "🍔", "🍟", "🌭", "🌮", "🌯", "🍿", "🍩",
      "🍪", "🎂", "🍰", "🧁", "🍫", "🍭", "🍬", "☕", "🍵", "🥤"
    ],
    "⚽ Activities": [
      "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏆", "🥇", "🥈", "🥉",
      "🎮", "🎯", "🎲", "🎸", "🎹", "🎤", "🎧", "🎨", "🎬", "🎭",
      "🎉", "🎊", "🎈", "🎁", "🎂"
    ],
    "✈️ Travel": [
      "✈️", "🚗", "🚕", "🚌", "🚆", "🚇", "🚲", "🏍️", "🚢", "⛵",
      "🚀", "🏠", "🏢", "🏫", "🏥", "🏖️", "🏝️", "🏔️", "🗼", "🗽",
      "🗿", "🌆", "🌃"
    ]
  };

  // ==============================
  // INSERT TEXT AT CURSOR
  // ==============================

  function insertAtCursor(text) {
    const start = postText.selectionStart;
    const end = postText.selectionEnd;

    const before = postText.value.substring(0, start);
    const after = postText.value.substring(end);

    postText.value = before + text + after;
    const newPosition = start + text.length;

    postText.focus();
    postText.setSelectionRange(newPosition, newPosition);
  }

  // ==============================
  // EMOJI PICKER
  // ==============================

  emojiBtn.addEventListener("click", () => {
    const wrapper = document.createElement("div");
    wrapper.className = "p-5";

    const header = document.createElement("div");
    header.className = "mb-4 flex items-center justify-between";

    const titleBox = document.createElement("div");
    const title = createElement("h3", "text-lg font-bold text-slate-900", "Choose a feeling");
    const subtitle = createElement("p", "text-xs text-slate-500", "Pick an emoji to add to your post");

    titleBox.appendChild(title);
    titleBox.appendChild(subtitle);

    const closeBtn = createElement(
      "button",
      "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200",
      "✕"
    );
    closeBtn.type = "button";
    closeBtn.addEventListener("click", closeModal);

    header.appendChild(titleBox);
    header.appendChild(closeBtn);

    wrapper.appendChild(header);

    const categoryBar = document.createElement("div");
    categoryBar.className = "mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide";

    const emojiGrid = document.createElement("div");
    emojiGrid.className = "grid max-h-[320px] grid-cols-7 gap-1 overflow-y-auto rounded-2xl bg-white/50 p-2";

    function renderEmojiGroup(groupName) {
      emojiGrid.innerHTML = "";
      emojiGroups[groupName].forEach((emoji) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = emoji;
        button.className =
          "flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition hover:scale-125 hover:bg-white hover:shadow-md active:scale-95";

        button.addEventListener("click", () => {
          insertAtCursor(emoji);
          closeModal();
        });

        emojiGrid.appendChild(button);
      });
    }

    Object.keys(emojiGroups).forEach((groupName, index) => {
      const categoryButton = createElement(
        "button",
        "shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition",
        groupName
      );
      categoryButton.type = "button";

      if (index === 0) {
        categoryButton.classList.add("bg-teal-600", "text-white", "shadow-md");
      } else {
        categoryButton.classList.add("bg-white/70", "text-slate-600", "hover:bg-white");
      }

      categoryButton.addEventListener("click", () => {
        document.querySelectorAll("#emojiCategoryButton").forEach((button) => {
          button.classList.remove("bg-teal-600", "text-white", "shadow-md");
          button.classList.add("bg-white/70", "text-slate-600");
        });

        categoryButton.classList.remove("bg-white/70", "text-slate-600");
        categoryButton.classList.add("bg-teal-600", "text-white", "shadow-md");

        renderEmojiGroup(groupName);
      });

      categoryButton.id = "emojiCategoryButton";
      categoryBar.appendChild(categoryButton);
    });

    wrapper.appendChild(categoryBar);
    wrapper.appendChild(emojiGrid);

    renderEmojiGroup(Object.keys(emojiGroups)[0]);
    openModal(wrapper);
  });

  // ==============================
  // PHOTO
  // ==============================

  photoBtn.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    selectedImage = file;
    selectedVideo = null;
    videoInput.value = "";

    showFilePreview(file, "image");
  });

  // ==============================
  // VIDEO
  // ==============================

  videoBtn.addEventListener("click", () => {
    videoInput.click();
  });

  videoInput.addEventListener("change", () => {
    const file = videoInput.files[0];
    if (!file) return;

    selectedVideo = file;
    selectedImage = null;
    imageInput.value = "";

    showFilePreview(file, "video");
  });

  // ==============================
  // FILE PREVIEW
  // ==============================

  function showFilePreview(file, type) {
    filePreview.innerHTML = "";
    filePreview.classList.remove("hidden");

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const removeBtn = createElement(
      "button",
      "absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:scale-110 hover:bg-red-500",
      "✕"
    );
    removeBtn.type = "button";

    removeBtn.addEventListener("click", () => {
      selectedImage = null;
      selectedVideo = null;
      imageInput.value = "";
      videoInput.value = "";

      filePreview.innerHTML = "";
      filePreview.classList.add("hidden");
    });

    if (type === "image") {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      image.alt = "Selected image";
      image.className = "max-h-80 w-full object-cover";
      wrapper.appendChild(image);
    }

    if (type === "video") {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.controls = true;
      video.className = "max-h-80 w-full object-cover";
      wrapper.appendChild(video);
    }

    wrapper.appendChild(removeBtn);
    filePreview.appendChild(wrapper);
  }

  // ==============================
  // LOCATION MODAL
  // ==============================

  locationBtn.addEventListener("click", () => {
    const wrapper = document.createElement("div");
    wrapper.className = "p-5";

    const header = document.createElement("div");
    header.className = "mb-5 flex items-center justify-between";

    const titleBox = document.createElement("div");
    const title = createElement("h3", "text-lg font-bold text-slate-900", "📍 Add Location");
    const subtitle = createElement("p", "text-xs text-slate-500", "Tell people where you are");

    titleBox.appendChild(title);
    titleBox.appendChild(subtitle);

    const closeBtn = createElement(
      "button",
      "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200",
      "✕"
    );
    closeBtn.type = "button";
    closeBtn.addEventListener("click", closeModal);

    header.appendChild(titleBox);
    header.appendChild(closeBtn);

    wrapper.appendChild(header);

    const locationInput = document.createElement("input");
    locationInput.type = "text";
    locationInput.placeholder = "Search or type a location...";
    locationInput.className =
      "w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100";

    wrapper.appendChild(locationInput);

    const currentLocationBtn = createElement(
      "button",
      "mt-3 flex w-full items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50/80 p-4 text-left transition hover:bg-teal-100",
      ""
    );

    const locationIcon = createElement(
      "span",
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg",
      "📍"
    );

    const locationTextBox = document.createElement("div");
    const locationTitle = createElement("p", "font-semibold text-teal-900", "Use my current location");
    const locationSubtitle = createElement("p", "text-xs text-teal-700", "Allow browser location permission");

    locationTextBox.appendChild(locationTitle);
    locationTextBox.appendChild(locationSubtitle);

    currentLocationBtn.appendChild(locationIcon);
    currentLocationBtn.appendChild(locationTextBox);

    wrapper.appendChild(currentLocationBtn);

    currentLocationBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
      }

      locationTitle.textContent = "Getting your location...";
      locationSubtitle.textContent = "Please wait...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toFixed(5);
          const longitude = position.coords.longitude.toFixed(5);

          insertAtCursor(`📍 Location: ${latitude}, ${longitude}`);
          closeModal();
        },
        () => {
          locationTitle.textContent = "Location permission denied";
          locationSubtitle.textContent = "Please type your location manually.";
        }
      );
    });

    const buttons = document.createElement("div");
    buttons.className = "mt-5 flex gap-3";

    const cancelBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-slate-100 py-3 font-semibold text-slate-600 transition hover:bg-slate-200",
      "Cancel"
    );
    cancelBtn.type = "button";

    const addBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-teal-200 transition hover:-translate-y-0.5",
      "Add Location"
    );
    addBtn.type = "button";

    cancelBtn.addEventListener("click", closeModal);

    addBtn.addEventListener("click", () => {
      const location = locationInput.value.trim();
      if (!location) {
        locationInput.focus();
        return;
      }

      insertAtCursor(`📍 ${location}`);
      closeModal();
    });

    buttons.appendChild(cancelBtn);
    buttons.appendChild(addBtn);

    wrapper.appendChild(buttons);
    openModal(wrapper);
  });

  // ==============================
  // LINK MODAL
  // ==============================

  linkBtn.addEventListener("click", () => {
    const wrapper = document.createElement("div");
    wrapper.className = "p-5";

    const header = document.createElement("div");
    header.className = "mb-5 flex items-center justify-between";

    const titleBox = document.createElement("div");
    const title = createElement("h3", "text-lg font-bold text-slate-900", "🔗 Add Link");
    const subtitle = createElement("p", "text-xs text-slate-500", "Share a website with your community");

    titleBox.appendChild(title);
    titleBox.appendChild(subtitle);

    const closeBtn = createElement(
      "button",
      "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200",
      "✕"
    );
    closeBtn.type = "button";
    closeBtn.addEventListener("click", closeModal);

    header.appendChild(titleBox);
    header.appendChild(closeBtn);

    wrapper.appendChild(header);

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.placeholder = "https://example.com";
    urlInput.className =
      "w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100";

    wrapper.appendChild(urlInput);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Link title (optional)";
    titleInput.className =
      "mt-3 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100";

    wrapper.appendChild(titleInput);

    const preview = document.createElement("div");
    preview.className =
      "mt-4 hidden rounded-2xl border border-sky-100 bg-sky-50/70 p-4";

    const previewIcon = createElement("span", "text-2xl", "🔗");
    const previewContent = document.createElement("div");
    previewContent.className = "mt-2";

    const previewTitle = createElement("p", "font-semibold text-slate-800");
    const previewUrl = createElement("p", "mt-1 break-all text-xs text-sky-600");

    previewContent.appendChild(previewTitle);
    previewContent.appendChild(previewUrl);

    preview.appendChild(previewIcon);
    preview.appendChild(previewContent);

    wrapper.appendChild(preview);

    urlInput.addEventListener("input", () => {
      const value = urlInput.value.trim();
      if (!value) {
        preview.classList.add("hidden");
        return;
      }

      preview.classList.remove("hidden");
      previewTitle.textContent = titleInput.value.trim() || "Shared Link";
      previewUrl.textContent = value;
    });

    titleInput.addEventListener("input", () => {
      if (titleInput.value.trim()) {
        previewTitle.textContent = titleInput.value.trim();
      }
    });

    const buttons = document.createElement("div");
    buttons.className = "mt-5 flex gap-3";

    const cancelBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-slate-100 py-3 font-semibold text-slate-600 transition hover:bg-slate-200",
      "Cancel"
    );
    cancelBtn.type = "button";

    const addBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5",
      "Add Link"
    );
    addBtn.type = "button";

    cancelBtn.addEventListener("click", closeModal);

    addBtn.addEventListener("click", () => {
      let url = urlInput.value.trim();
      if (!url) {
        urlInput.focus();
        return;
      }

      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      try {
        new URL(url);
      } catch {
        urlInput.focus();
        urlInput.classList.add("border-red-400");
        return;
      }

      const linkTitle = titleInput.value.trim() || "Open Link";
      insertAtCursor(`🔗 ${linkTitle}: ${url}`);

      closeModal();
    });

    buttons.appendChild(cancelBtn);
    buttons.appendChild(addBtn);

    wrapper.appendChild(buttons);
    openModal(wrapper);
  });

  // ==============================
  // CREATE POST
  // ==============================

  postBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const text = postText.value.trim();

    if (!name) {
      nameInput.focus();
      showMessage("Please enter your name.");
      return;
    }

    if (!text && !selectedImage && !selectedVideo) {
      postText.focus();
      showMessage("Please write something or add a photo/video.");
      return;
    }

    const newPost = {
      id: Date.now(),
      name: name,
      text: text,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
      video: selectedVideo ? URL.createObjectURL(selectedVideo) : null,
      likes: 0,
      liked: false,
      createdAt: new Date(),
    };

    posts.unshift(newPost);
    renderPosts();

    // Reset form
    nameInput.value = "";
    postText.value = "";

    selectedImage = null;
    selectedVideo = null;

    imageInput.value = "";
    videoInput.value = "";

    filePreview.innerHTML = "";
    filePreview.classList.add("hidden");
  });

  // ==============================
  // SEARCH FUNCTIONALITY (NEW)
  // ==============================

  searchInput.addEventListener("input", () => {
    renderPosts();
  });

  // ==============================
  // MESSAGE
  // ==============================

  function showMessage(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "flex items-center gap-3 p-5";

    const icon = createElement(
      "div",
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl",
      "⚠️"
    );

    const content = document.createElement("div");
    const title = createElement("p", "font-semibold text-slate-900", "Something is missing");
    const text = createElement("p", "mt-1 text-sm text-slate-500", message);

    content.appendChild(title);
    content.appendChild(text);

    const closeBtn = createElement(
      "button",
      "ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500",
      "✕"
    );
    closeBtn.type = "button";
    closeBtn.addEventListener("click", closeModal);

    wrapper.appendChild(icon);
    wrapper.appendChild(content);
    wrapper.appendChild(closeBtn);

    openModal(wrapper);
  }

  // ==============================
  // RENDER POSTS
  // ==============================

  function renderPosts() {
    postsContainer.innerHTML = "";

    const query = searchInput.value.trim().toLowerCase();

    // Filter posts by user name using .filter()
    const filteredPosts = posts.filter((post) =>
      post.name.toLowerCase().includes(query)
    );

    postCount.textContent = `${filteredPosts.length} ${
      filteredPosts.length === 1 ? "Post" : "Posts"
    }`;

    filteredPosts.forEach((post) => {
      const postCard = document.createElement("article");
      postCard.className =
        "relative overflow-visible rounded-3xl border border-white/70 bg-white/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1";

      // POST HEADER
      const header = document.createElement("div");
      header.className = "flex items-center justify-between";

      const userBox = document.createElement("div");
      userBox.className = "flex items-center gap-3";

      const avatar = createElement(
        "div",
        "flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 via-emerald-500 to-sky-500 font-bold text-white shadow-lg",
        getInitial(post.name)
      );

      const userInfo = document.createElement("div");
      const userName = createElement(
        "h3",
        "font-semibold text-slate-900",
        post.name
      );
      const time = createElement(
        "p",
        "text-xs text-slate-500",
        formatTime(post.createdAt)
      );

      userInfo.appendChild(userName);
      userInfo.appendChild(time);

      userBox.appendChild(avatar);
      userBox.appendChild(userInfo);

      // MORE BUTTON (MENU)
      const menuWrapper = document.createElement("div");
      menuWrapper.className = "relative";

      const moreBtn = createElement(
        "button",
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-xl text-slate-500 transition hover:bg-white hover:shadow-md",
        "⋯"
      );
      moreBtn.type = "button";

      const menu = document.createElement("div");
      menu.className =
        "absolute right-0 top-11 z-50 hidden w-36 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-1 shadow-2xl backdrop-blur-xl";

      const editBtn = createElement(
        "button",
        "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-teal-50",
        "✏️ Edit"
      );

      const deleteBtn = createElement(
        "button",
        "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50",
        "🗑️ Delete"
      );

      editBtn.type = "button";
      deleteBtn.type = "button";

      menu.appendChild(editBtn);
      menu.appendChild(deleteBtn);

      menuWrapper.appendChild(moreBtn);
      menuWrapper.appendChild(menu);

      moreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".post-menu").forEach((item) => {
          item.classList.add("hidden");
        });
        menu.classList.toggle("hidden");
      });

      menu.classList.add("post-menu");

      editBtn.addEventListener("click", () => {
        editPost(post.id);
      });

      deleteBtn.addEventListener("click", () => {
        deletePost(post.id);
      });

      header.appendChild(userBox);
      header.appendChild(menuWrapper);
      postCard.appendChild(header);

      // POST TEXT
      if (post.text) {
        const text = createElement(
          "p",
          "mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700",
          post.text
        );
        postCard.appendChild(text);
      }

      // IMAGE
      if (post.image) {
        const image = document.createElement("img");
        image.src = post.image;
        image.alt = "Post image";
        image.className =
          "mt-4 max-h-[500px] w-full rounded-2xl object-cover shadow-md";
        postCard.appendChild(image);
      }

      // VIDEO
      if (post.video) {
        const video = document.createElement("video");
        video.src = post.video;
        video.controls = true;
        video.className =
          "mt-4 max-h-[500px] w-full rounded-2xl bg-black object-contain shadow-md";
        postCard.appendChild(video);
      }

      // ACTIONS
      const actions = document.createElement("div");
      actions.className =
        "mt-5 flex items-center justify-between border-t border-white/60 pt-4";

      const likeBtn = createElement(
        "button",
        "rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/70",
        post.liked ? `❤️ ${post.likes}` : `🤍 ${post.likes}`
      );

      const commentBtn = createElement(
        "button",
        "rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70",
        "💬 Comment"
      );

      const shareBtn = createElement(
        "button",
        "rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70",
        "↗️ Share"
      );

      likeBtn.type = "button";
      commentBtn.type = "button";
      shareBtn.type = "button";

      likeBtn.addEventListener("click", () => {
        post.liked = !post.liked;
        if (post.liked) {
          post.likes++;
        } else {
          post.likes--;
        }
        renderPosts();
      });

      commentBtn.addEventListener("click", () => {
        openCommentModal(post);
      });

      shareBtn.addEventListener("click", () => {
        sharePost(post);
      });

      actions.appendChild(likeBtn);
      actions.appendChild(commentBtn);
      actions.appendChild(shareBtn);

      postCard.appendChild(actions);
      postsContainer.appendChild(postCard);
    });
  }

  // ==============================
  // INITIALS
  // ==============================

  function getInitial(name) {
    return name.charAt(0).toUpperCase();
  }

  // ==============================
  // TIME
  // ==============================

  function formatTime(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    if (seconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    return new Date(date).toLocaleDateString();
  }

  // ==============================
  // DELETE POST
  // ==============================

  function deletePost(id) {
    const post = posts.find((item) => item.id === id);
    if (!post) return;

    const wrapper = document.createElement("div");
    wrapper.className = "p-5";

    const title = createElement(
      "h3",
      "text-lg font-bold text-slate-900",
      "Delete this post?"
    );

    const message = createElement(
      "p",
      "mt-2 text-sm leading-6 text-slate-500",
      "This action cannot be undone."
    );

    const buttons = document.createElement("div");
    buttons.className = "mt-5 flex gap-3";

    const cancelBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-slate-100 py-3 font-semibold text-slate-600 hover:bg-slate-200",
      "Cancel"
    );

    const confirmBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 py-3 font-semibold text-white shadow-lg shadow-red-200 hover:-translate-y-0.5",
      "Delete"
    );

    cancelBtn.type = "button";
    confirmBtn.type = "button";

    cancelBtn.addEventListener("click", closeModal);

    confirmBtn.addEventListener("click", () => {
      posts = posts.filter((item) => item.id !== id);
      renderPosts();
      closeModal();
    });

    buttons.appendChild(cancelBtn);
    buttons.appendChild(confirmBtn);

    wrapper.appendChild(title);
    wrapper.appendChild(message);
    wrapper.appendChild(buttons);

    openModal(wrapper);
  }

  // ==============================
  // EDIT POST (UPDATED: NAME + POST EDIT)
  // ==============================

  function editPost(id) {
    const post = posts.find((item) => item.id === id);
    if (!post) return;

    const wrapper = document.createElement("div");
    wrapper.className = "p-5";

    const title = createElement(
      "h3",
      "mb-4 text-lg font-bold text-slate-900",
      "✏️ Edit Post & Author"
    );

    // Edit Name Label & Input
    const nameLabel = createElement(
      "label",
      "block mb-1 text-xs font-semibold text-slate-600",
      "Author Name"
    );
    const editNameInput = document.createElement("input");
    editNameInput.type = "text";
    editNameInput.value = post.name;
    editNameInput.className =
      "mb-4 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2.5 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 text-sm";

    // Edit Post Text Label & Input
    const textLabel = createElement(
      "label",
      "block mb-1 text-xs font-semibold text-slate-600",
      "Post Content"
    );
    const editTextInput = document.createElement("textarea");
    editTextInput.value = post.text;
    editTextInput.rows = 4;
    editTextInput.className =
      "w-full resize-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 text-sm";

    const buttons = document.createElement("div");
    buttons.className = "mt-4 flex gap-3";

    const cancelBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-slate-100 py-3 font-semibold text-slate-600 hover:bg-slate-200",
      "Cancel"
    );

    const saveBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-teal-200",
      "Save Changes"
    );

    cancelBtn.type = "button";
    saveBtn.type = "button";

    cancelBtn.addEventListener("click", closeModal);

    saveBtn.addEventListener("click", () => {
      const newName = editNameInput.value.trim();
      const newText = editTextInput.value.trim();

      if (!newName) {
        editNameInput.focus();
        return;
      }

      if (!newText && !post.image && !post.video) {
        editTextInput.focus();
        return;
      }

      post.name = newName;
      post.text = newText;

      renderPosts();
      closeModal();
    });

    buttons.appendChild(cancelBtn);
    buttons.appendChild(saveBtn);

    wrapper.appendChild(title);
    wrapper.appendChild(nameLabel);
    wrapper.appendChild(editNameInput);
    wrapper.appendChild(textLabel);
    wrapper.appendChild(editTextInput);
    wrapper.appendChild(buttons);

    openModal(wrapper);

    setTimeout(() => {
      editNameInput.focus();
    }, 100);
  }

  // ==============================
  // COMMENT
  // ==============================

  function openCommentModal(post) {
    const wrapper = document.createElement("div");
    wrapper.className = "p-5";

    const title = createElement(
      "h3",
      "text-lg font-bold text-slate-900",
      "💬 Add Comment"
    );

    const commentInput = document.createElement("textarea");
    commentInput.rows = 4;
    commentInput.placeholder = "Write a comment...";
    commentInput.className =
      "mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100";

    const buttons = document.createElement("div");
    buttons.className = "mt-4 flex gap-3";

    const cancelBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-slate-100 py-3 font-semibold text-slate-600",
      "Cancel"
    );

    const commentBtn = createElement(
      "button",
      "flex-1 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg",
      "Comment"
    );

    cancelBtn.type = "button";
    commentBtn.type = "button";

    cancelBtn.addEventListener("click", closeModal);

    commentBtn.addEventListener("click", () => {
      const comment = commentInput.value.trim();
      if (!comment) return;

      closeModal();
      setTimeout(() => {
        showMessage("Comment added successfully! 💬");
      }, 250);
    });

    buttons.appendChild(cancelBtn);
    buttons.appendChild(commentBtn);

    wrapper.appendChild(title);
    wrapper.appendChild(commentInput);
    wrapper.appendChild(buttons);

    openModal(wrapper);

    setTimeout(() => {
      commentInput.focus();
    }, 100);
  }

  // ==============================
  // SHARE (WITHOUT ASYNC / AWAIT)
  // ==============================

  function sharePost(post) {
    const shareText = `${post.name} shared a post:\n\n${post.text || ""}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Community Post",
          text: shareText,
        })
        .catch(() => {
          // User cancelled share
        });
      return;
    }

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          showMessage("Post copied to clipboard! 📋");
        })
        .catch(() => {
          showMessage("Could not copy the post.");
        });
      return;
    }

    showMessage("Sharing is not supported on this browser.");
  }

  // ==============================
  // CLOSE POST MENUS
  // ==============================

  document.addEventListener("click", () => {
    document.querySelectorAll(".post-menu").forEach((menu) => {
      menu.classList.add("hidden");
    });
  });

  // ==============================
  // INITIAL RENDER
  // ==============================

  renderPosts();
});