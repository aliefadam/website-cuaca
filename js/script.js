$(document).ready(function () {
  $("#button-search").on("click", function () {
    const locationSearch = $("#location-search").val();
    $("#not-found").hide(500, function () {
      $("#not-found").html("");
    });
    $("#detail-cuaca").hide(500);
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
        q: locationSearch,
        appid: "88204fa2985d407584586380103f3c41",
        units: "metric",
      },
      success: function (response) {
        const cuaca = response.weather[0].main;
        const suhu = response.main.temp;
        const kelembaban = response.main.humidity;
        const kecepatanAngin = response.wind.speed;
        const negara = response.sys.country;
        const kota = response.name;

        let namaGambar = "";
        let namaCuaca = "";

        if (cuaca === "Clear") {
          namaGambar = "clear.png";
          namaCuaca = "Cerah";
        }

        if (cuaca === "Clouds") {
          namaGambar = "cloud.png";
          namaCuaca = "Berawan";
        }

        if (cuaca === "Mist") {
          namaGambar = "mist.png";
          namaCuaca = "Kabut";
        }

        if (cuaca === "Fog") {
          namaGambar = "mist.png";
          namaCuaca = "Berembun";
        }

        if (cuaca === "Rain") {
          namaGambar = "rain.png";
          namaCuaca = "Hujan";
        }

        if (cuaca === "Drizzle") {
          namaGambar = "rain.png";
          namaCuaca = "Gerimis";
        }

        if (cuaca === "Snow") {
          namaGambar = "snow.png";
          namaCuaca = "Salju";
        }

        if (cuaca === "Thunderstorm") {
          namaGambar = "snow.png";
          namaCuaca = "Badai Petir";
        }

        if (cuaca === "Haze") {
          namaGambar = "mist.png";
          namaCuaca = "Kabut";
        }
        let delay = 0;
        if ($("#detail-cuaca").attr("data-awal") == "true") {
          delay = 0;
        } else if ($("#detail-cuaca").attr("data-input-kosong") == "true") {
          delay = 0;
        } else {
          delay = 500;
        }
        setTimeout(() => {
          $("img#cuaca").attr("src", `/imgs/${namaGambar}`);
          $("#nama-cuaca").text(namaCuaca);
          $("#suhu").text(suhu);
          $("#negara").text(negara);
          $("#kota").text(kota);
          $("#kelembaban").text(`${kelembaban}%`);
          $("#kecepatan-angin").text(`${kecepatanAngin} km/jam`);
        }, delay);

        $("#detail-cuaca").show(500);
        $("#detail-cuaca").attr("data-awal", "false");
        $("#detail-cuaca").attr("data-input-kosong", "false");
      },
      error: function (e) {
        $("#detail-cuaca").attr("data-input-kosong", "true");

        $("#not-found").show(500, function () {
          $(this).html(`
                <h1 class="w-full relative text-center text-xl poppins-semibold text-blue-700">
                    Lokasi yang anda cari tidak ada didata kami
                </h1>
            `);
        });
      },
    });
  });

  $("#location-search").on("keydown", function (e) {
    if (e.key === "Enter") {
      $("#button-search").click();
    }
  });
});
