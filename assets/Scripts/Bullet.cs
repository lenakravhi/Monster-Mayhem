using UnityEngine;

public class Bullet : MonoBehaviour
{
    // Посилання на батьківський об'єкт (призначається ззовні)
    private GameObject parent;
    public GameObject Parent { set { parent = value; } get { return parent; } }

    // Швидкість руху кулі
    private float speed = 10.0f;

    // Напрямок руху кулі (призначається ззовні)
    private Vector3 direction;
    public Vector3 Direction { set { direction = value; } }

    // Встановлення кольору кулі
    public Color Color
    {
        set { GetComponentInChildren<SpriteRenderer>().color = value; }
    }

    private void Start()
    {
        // Знищення кулі через 1.4 секунди після створення
        Destroy(gameObject, 1.4f);
    }

    private void Update()
    {
        // Переміщення кулі у напрямку direction зі швидкістю speed
        transform.position += direction * speed * Time.deltaTime;
    }

    private void OnTriggerEnter2D(Collider2D collider)
    {
        // Отримання посилання на компонент Unit об'єкта, з яким зіткнулась куля
        Unit unit = collider.GetComponent<Unit>();

        // Якщо це юніт і він не є батьківським об'єктом кулі, знищуємо кулю
        if (unit && unit.gameObject != parent)
        {
            Destroy(gameObject);
        }
    }
}
