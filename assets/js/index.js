$("#add_user").submit(() => {
  alert("데이터 입력 성공");
});

$("#update_user").submit((이벤트) => {
  이벤트.preventDefault();

  let unindexed_array = $("#update_user").serializeArray();
  let data = {};

  // unindexed_array.forEach((element) => (data[element["name"]] = element["value"]));
  $.map(unindexed_array, (n, i) => (data[n["name"]] = n["value"]));

  console.log(data);

  let request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(() => {
    alert("데이터 갱신 성공");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(() => {
    let id = $ondelete.attr("data-id");

    let request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("정말로 삭제하시겠습니까?")) {
      $.ajax(request).done(() => {
        alert("삭제 성공");
        window.location.reload();
      });
    }
  });
}
